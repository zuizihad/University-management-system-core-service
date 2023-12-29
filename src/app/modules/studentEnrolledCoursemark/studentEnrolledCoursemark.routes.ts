import express from 'express';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCoursemark.controller';

const router = express.Router();

router.patch('/update-marks', StudentEnrolledCourseMarkController.updateStudentMarks)
router.patch('/update-final-marks', StudentEnrolledCourseMarkController.updateFinalMarks)

export const studentEnrolledCourseMarkRoutes = router;