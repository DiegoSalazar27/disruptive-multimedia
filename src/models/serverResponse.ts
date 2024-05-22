export type ServerResponse<T> = {
  code: string,
  message: string,
  info: T,
}