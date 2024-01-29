import { Course } from "../types/Course";

export function getLakeBreeze(courseId: string, courses: Course[]) {
  return courses.find((course) => course.id === courseId);
}