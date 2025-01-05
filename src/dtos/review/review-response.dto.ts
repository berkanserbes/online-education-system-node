export interface ReviewResponseDTO {
  id: number;
  rating: number;
  comment: string;
  student?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  course?: {
    id: number;
    title: string;
  };
}
