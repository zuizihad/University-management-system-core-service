import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.get('/', OfferedCourseController.getAllFromDB);

router.get('/:id', OfferedCourseController.getByIdFromDB);


router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(OfferedCourseValidation.create),
    OfferedCourseController.insertIntoDB
);

router.patch(
    '/:id',
    validateRequest(OfferedCourseValidation.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    OfferedCourseController.updateOneInDB
);

router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    OfferedCourseController.deleteByIdFromDB
);


export const OfferedCourseRoutes = router;