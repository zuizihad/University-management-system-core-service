import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.get(
  '/get-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMyRegistration
);

router.get(
  '/get-my-semester-courses',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMySemesterRegCourses
);

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(SemesterRegistrationValidation.create),
  SemesterRegistrationController.insertIntoDB
);

router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  // validateRequest(SemesterRegistrationValidation.create),
  SemesterRegistrationController.startMyRegistration
);

router.post(
  '/enroll-into-course',
  auth(ENUM_USER_ROLE.STUDENT),
  validateRequest(SemesterRegistrationValidation.enrollOrWithdrawCourse),
  SemesterRegistrationController.enrollIntoCourse
);

router.post(
  '/withdraw-from-course',
  auth(ENUM_USER_ROLE.STUDENT),
  validateRequest(SemesterRegistrationValidation.enrollOrWithdrawCourse),
  SemesterRegistrationController.withdrawFromCourse
);

router.post(
  '/confirm-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.confirmMyRegistration
);

router.post(
  '/:id/start-new-semester',
  auth(ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.startNewSemester
);

router.get('/', SemesterRegistrationController.getAllFromDB);

router.get('/:id', SemesterRegistrationController.getByIdFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(SemesterRegistrationValidation.update),
  SemesterRegistrationController.updateOneInDB
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), SemesterRegistrationController.deleteByIdFromDB);

export const SemesterRegistrationRoutes = router;
