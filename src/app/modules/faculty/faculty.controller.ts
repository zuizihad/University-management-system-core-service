import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constants';
import { FacultyService } from './faculty.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await FacultyService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty created successfully',
        data: result
    });
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, facultyFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await FacultyService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties fetched successfully',
        meta: result.meta,
        data: result.data
    });
})

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FacultyService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty fetched successfully',
        data: result
    });
});

const assignCourses = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FacultyService.assignCourses(id, req.body.courses);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course assigned successfully',
        data: result
    });
})

const removeCoursesFromFaculty = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FacultyService.removeCoursesFromFaculty(id, req.body.courses);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course removed successfully',
        data: result
    });
})

const myCourses = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const filter = pick(req.query, ["academicSemesterId", "courseId"])
    const result = await FacultyService.myCourses(user, filter);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My courses data fetched successfully',
        data: result
    });
})

export const FacultyController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    assignCourses,
    removeCoursesFromFaculty,
    myCourses
};