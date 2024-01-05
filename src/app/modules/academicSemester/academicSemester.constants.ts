export const AcademicSemesterSearchableFields = [
  'title',
  'code',
  'startMonth',
  'endMonth',
];

export const AcademicSemesterFilterableFields = [
  'startMonth',
  'endMonth',
  'searchTerm',
  'title',
  'code',
];

export const AcademicSemesterOptions = ['limit', 'page', 'sortBy', 'sortOrder'];

export const semesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester.created'