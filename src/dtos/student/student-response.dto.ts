import { CourseResponseDTO } from "../course/course-response.dto";
import { CertificateResponseDTO } from "../certificate/certificate-response.dto";

export interface StudentResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  studentNumber?: string;
  phone?: string;
  profileImage?: string;
  emailVerified: boolean;
  lastLogin?: Date;
  enrollmentDate?: Date;

  // Related entities
  enrolledCourses?: Partial<CourseResponseDTO>[];
  completedCourses?: Partial<CourseResponseDTO>[];
  certificates?: Partial<CertificateResponseDTO>[];
}
