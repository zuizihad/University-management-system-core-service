import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { studentEnrolledCourseMarkFilterableFields } from "./studentEnrolledCoursemark.constants";
import { studentEnrolledCourseMarkService } from "./studentEnrolledCoursemark.service";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await studentEnrolledCourseMarkService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student course marks fetched successfully',
        meta: result.meta,
        data: result.data
    });
});

const getMyCourseMarks = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const user = (req as any).user;

    const result = await studentEnrolledCourseMarkService.getMyCourseMarks(filters, options, user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student course marks fetched successfully',
        meta: result.meta,
        data: result.data
    });
});

const updateStudentMarks = catchAsync(async(req: Request, res: Response) => {
    const result = await studentEnrolledCourseMarkService.updateStudentMarks(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Marks updated',
        data: result
    })
})

const updateFinalMarks = catchAsync(async(req: Request, res: Response) => {
    const result = await studentEnrolledCourseMarkService.updateFinalMarks(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Final marks updated',
        data: result
    })
})

export const StudentEnrolledCourseMarkController = {
    updateStudentMarks,
    updateFinalMarks,
    getAllFromDB,
    getMyCourseMarks
}