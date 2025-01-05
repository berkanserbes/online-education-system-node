export interface CertificateResponseDTO {
  id: number;
  certificateCode: string;
  issueDate: Date;
  student: {
    id: number;
    firstName: string;
    lastName: string;
  };
  course: {
    id: number;
    title: string;
  };
}
