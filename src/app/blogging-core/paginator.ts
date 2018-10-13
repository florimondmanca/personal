export class CursorPaginator<T> {

  // NOTE: next is a fully qualified URL
  constructor(public next: string, public results: T[]) { }

  static empty<T>(): CursorPaginator<T> {
    return new CursorPaginator<T>(null, []);
  }
}
