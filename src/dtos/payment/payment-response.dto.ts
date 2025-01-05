export interface PaymentResponseDTO {
  id: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  paymentStatus: string;
  student?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  course?: {
    id: number;
    title: string;
    price: number;
  };
}
