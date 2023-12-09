import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'Academic department id is required',
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester reg. is required',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'Course id is required'
      }),
      {required_error: 'Course ids are required',}
    ),
  }),
});

const update = z.object({
  body: z.object({
      semesterRegistrationId: z.string().optional(),
      courseId: z.string().optional(),
      academicDepartmentId: z.string().optional()
  })
});

export const OfferedCourseValidation = {
  create,
  update,
};
