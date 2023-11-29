import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Start date is required.',
    }),
    endDate: z.string({
      required_error: 'End date is required.',
    }),
    academicSemesterId: z.string({
      required_error: 'Academic semester id is required.',
    }),
    minCredit: z.string({
      required_error: 'Minimum credit is required.',
    }),
    maxCredit: z.string({
      required_error: 'Maximum credit is required.',
    }),
  }),
});

const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    academicSemesterId: z.string().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
    status: z.enum([...Object.values(SemesterRegistrationStatus)] as [string, ...string[]], {}).optional(),
  }),
});

export const SemesterRegistrationValidation = {
  create,
  update,
};