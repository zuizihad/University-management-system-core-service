/*
  Warnings:

  - You are about to drop the column `weekDays` on the `offered_course_class_schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offered_course_class_schedule" DROP COLUMN "weekDays",
ADD COLUMN     "dayOfWeek" "WeekDays" NOT NULL DEFAULT 'STAURDAY';

-- CreateTable
CREATE TABLE "student_semester_registration_courses" (
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_semester_registration_courses_pkey" PRIMARY KEY ("semesterRegistrationId","studentId","offeredCourseId")
);
