export interface IAdapter<T> {
  adapt(item: any): T;
}
