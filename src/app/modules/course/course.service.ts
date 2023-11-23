import { Course, Prisma, Room } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { roomSearchableFields } from './course.constant';
import { ICourseCreateData, IPrerequisiteCourseRequest } from './course.interface';

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({
      data: courseData,
    });

    if (!result)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to creating course');

    // if pre requisite course exist ,then create
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (const preRequisiteCourse of preRequisiteCourses) {
        const createPrerequisite =
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: result.id,
              prerequisiteId: preRequisiteCourse.courseId,
            },
          });
      }
    }
    return result;
  });

  // return new course with pre requisite course and pre requisite for
  if (newCourse) {
    const response = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            prerequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return response;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to creating course');
};

const getAllFromDB = async (
  filters: IRoomFilerRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: roomSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      preRequisite: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.course.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          prerequisite: true,
        },
      },
      preRequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Course> => {
  await prisma.courseToPrerequisite.deleteMany({
      where: {
          OR: [
              {
                  courseId: id
              },
              {
                  prerequisiteId: id
              }
          ]
      }
  });

  const result = await prisma.course.delete({
      where: {
          id
      }
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: ICourseCreateData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async (transactionClient) => {
      const result = await transactionClient.course.update({
          where: {
              id
          },
          data: courseData
      })

      if (!result) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Unable to update course")
      }

      if (preRequisiteCourses && preRequisiteCourses.length > 0) {
          const deletePrerequisite = preRequisiteCourses.filter(
              (coursePrerequisite) => coursePrerequisite.courseId && coursePrerequisite.isDeleted
          )

          const newPrerequisite = preRequisiteCourses.filter(
              (coursePrerequisite) => coursePrerequisite.courseId && !coursePrerequisite.isDeleted
          )

          await asyncForEach(
              deletePrerequisite,
              async (deletePreCourse: IPrerequisiteCourseRequest) => {
                  await transactionClient.courseToPrerequisite.deleteMany({
                      where: {
                          AND: [
                              {
                                  courseId: id
                              },
                              {
                                  prerequisiteId: deletePreCourse.courseId
                              }
                          ]
                      }
                  })
              }
          )

          await asyncForEach(
              newPrerequisite,
              async (insertPrerequisite: IPrerequisiteCourseRequest) => {
                  await transactionClient.courseToPrerequisite.create({
                      data: {
                          courseId: id,
                          prerequisiteId: insertPrerequisite.courseId
                      }
                  })
              }
          )
      }

      return result;
  })

  const responseData = await prisma.course.findUnique({
      where: {
          id
      },
      include: {
          preRequisite: {
              include: {
                  prerequisite: true
              }
          },
          preRequisiteFor: {
              include: {
                  course: true
              }
          }
      }
  })

  return responseData
}

export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateOneInDB
};
