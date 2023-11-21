import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes
  },
  {
    path: "/faculties",
    route: FacultyRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
