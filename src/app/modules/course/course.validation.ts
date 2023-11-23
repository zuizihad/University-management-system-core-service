import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'COurse name is required',
    }),
    code: z.string({
      required_error: 'Course code is required',
    }),
    credits: z.number({
      required_error: 'Course credits is required',
    }),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string({}),
        })
      )
      .optional(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string({
      required_error: 'COurse name is required',
    }),
    code: z.string({
      required_error: 'Course code is required',
    }),
    credits: z.string({
      required_error: 'Course credits is required',
    }),
    preRequisiteCourses: z
      .array(
        z.object({
          courseId: z.string({}),
        })
      )
      .optional(),
  }),
});

export const CourseValidation = {
  create,
  update,
};
