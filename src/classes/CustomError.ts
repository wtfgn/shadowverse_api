import { HttpStatusCode } from "axios";

export class CustomError extends Error {
  status: HttpStatusCode;

  constructor(message: string, status: HttpStatusCode) {
    super(message);
    this.status = status;
  }
}