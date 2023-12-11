import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { semesterRegistrationFilterableFields } from "./semesterRegistration.constant";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const insertIntoDB = catchAsync(async(req: Request, res: Response) => {
    const result = await SemesterRegistrationService.insertIntoDB(req.body);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester registration created',
        data: result
    })

})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterRegistrationFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await SemesterRegistrationService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'SemesterRegistrations fetched successfully',
        meta: result.meta,
        data: result.data
    });
})

const getByIdFromDB = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await SemesterRegistrationService.getByIdFromDB(id);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester fetched successfully',
        data: result
    })
})

const updateOneInDB = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await SemesterRegistrationService.updateOneInDB(id, req.body);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester updated successfully',
        data: result
    })
})

const deleteByIdFromDB = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await SemesterRegistrationService.deleteByIdFromDB(id);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester deleted successfully',
        data: result
    })
})

const startMyRegistration = catchAsync(async(req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.startMyRegistration(user.userId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester registration started successfully',
        data: result
    })
})

const enrollIntoCourse = catchAsync(async(req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.enrollIntoCourse(user?.userId, req.body);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student Semester registration course enrolled successfully',
        data: result
    })
})

const withdrawFromCourse = catchAsync(async(req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.withdrawFromCourse(user?.userId, req.body);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student withdraw from course successfully',
        data: result
    })
})

const confirmMyRegistration = catchAsync(async(req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.confirmMyRegistration(user?.userId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student semester registration confirmed successfully',
        data: result
    })
})

const getMyRegistration = catchAsync(async(req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await SemesterRegistrationService.getMyRegistration(user?.userId);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'My semester registration data fetched',
        data: result
    })
})

const startNewSemester = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await SemesterRegistrationService.startNewSemester(id);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester started.',
        data: result
    })
})

export const SemesterRegistrationController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    startMyRegistration,
    enrollIntoCourse,
    withdrawFromCourse,
    confirmMyRegistration,
    getMyRegistration,
    startNewSemester
}