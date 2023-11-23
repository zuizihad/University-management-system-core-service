import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = express.Router();

router.get('/', BuildingController.getAllFromDB);

router.get('/:id', BuildingController.getByIdFromDB);


router.post(
    '/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
    validateRequest(RoomValidation.create),
    BuildingController.insertIntoDB
);


export const RoomsRoutes = router;