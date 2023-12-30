import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllFromDB);

router.get('/get-my-course-schedules', auth(ENUM_USER_ROLE.STUDENT), StudentController.getMyCourseSchedules);

router.get('/my-academic-info', auth(ENUM_USER_ROLE.STUDENT), StudentController.getMyAcademicInfo);

router.get('/my-courses', auth(ENUM_USER_ROLE.STUDENT), StudentController.myCourses);

router.get('/:id', StudentController.getByIdFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentValidation.update),
  StudentController.updateIntoDB
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(StudentValidation.create),
  StudentController.insertIntoDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.deleteByIdFromDB
);

export const StudentRoutes = router;
