export type ErrorHint = 'report' | 'retry_later';

export interface Error {
  id: number;
  text: string;
  hint: ErrorHint;
}
