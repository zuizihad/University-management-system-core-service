import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.get('/', CourseController.getAllFromDB);

router.get('/:id', CourseController.getByIdFromDB);

router.patch(
    '/:id',
    validateRequest(CourseValidation.update),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CourseController.updateOneInDB
);


router.delete(
    '/:id',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    CourseController.deleteByIdFromDB
);

router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(CourseValidation.create),
    CourseController.insertIntoDB
);

router.post(
    '/:id/assign-faculties',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(CourseValidation.assignOrRemoveFaculties),
    CourseController.assignFaculties
);

router.delete(
    '/:id/remove-faculties',
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(CourseValidation.assignOrRemoveFaculties),
    CourseController.removeFaculties
);

export const CourseRoutes = router;