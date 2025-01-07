export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number, error?: Error) {
    super(message);
    this.status = status;
    if (error) {
      this.stack = error.stack;
    }
  }
}
