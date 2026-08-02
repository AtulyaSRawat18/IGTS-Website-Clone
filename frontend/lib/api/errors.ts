export class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;
  code?: string;

  constructor(status: number, message: string, fields?: Record<string, string>, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
    this.code = code;
  }
}
