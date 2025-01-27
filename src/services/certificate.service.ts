import { CertificateResponseDTO } from "../dtos/certificate/certificate-response.dto";
import { CreateCertificateDTO } from "../dtos/certificate/create-certificate.dto";
import { Certificate } from "../models/certificate.model";

export class CertificateService {
  static async createCertificate(dto: CreateCertificateDTO): Promise<any> {
    try {
      const certificate = await Certificate.create(dto);

      const result: CertificateResponseDTO = {
        id: certificate.id,
        certificateCode: certificate.certificateCode,
        issueDate: certificate.issueDate,
        studentId: certificate.studentId,
        courseId: certificate.courseId,
      };

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCertificates(): Promise<CertificateResponseDTO[]> {
    try {
      const certificates: Certificate[] = await Certificate.findAll();

      const result: CertificateResponseDTO[] = certificates.map(
        (certificate) => ({
          id: certificate.id,
          certificateCode: certificate.certificateCode,
          issueDate: certificate.issueDate,
          studentId: certificate.studentId,
          courseId: certificate.courseId,
        })
      );

      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
