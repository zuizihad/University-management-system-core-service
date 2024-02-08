import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllFromDB);

router.get('/my-courses',  auth(ENUM_USER_ROLE.FACULTY), FacultyController.myCourses);

router.get('/:id', FacultyController.getByIdFromDB);

router.get(
    '/my-course-students',
    auth(ENUM_USER_ROLE.FACULTY),
    FacultyController.getMyCourseStudents
);

router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(FacultyValidation.create),
    FacultyController.insertIntoDB
);

router.patch(
    '/:id',
    validateRequest(FacultyValidation.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    FacultyController.updateOneInDB
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    FacultyController.deleteByIdFromDB
);

router.post(
    '/:id/assign-courses',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(FacultyValidation.assignOrRemoveCourses),
    FacultyController.assignCourses
);

router.delete(
    '/:id/remove-courses',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(FacultyValidation.assignOrRemoveCourses),
    FacultyController.removeCoursesFromFaculty
);


export const FacultyRoutes = router;