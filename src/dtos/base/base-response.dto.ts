export interface BaseResponseDTO<T> {
  message: string;
  isSuccess: boolean;
  data: T;
}
