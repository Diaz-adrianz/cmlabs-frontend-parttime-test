export interface ActionResponse<T> {
  status: boolean;
  message: string;
  data: T;
}
