import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { studentEnrolledCourseMarkService } from "./studentEnrolledCoursemark.service";

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
    updateFinalMarks
}