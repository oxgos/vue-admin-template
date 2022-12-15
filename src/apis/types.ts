export interface ResponsePattern<T = any> {
  code: number;
  data: T;
  message: string;
}
