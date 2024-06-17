export default class ParsingError extends Error {
  statusCode = 400;
  constructor(message?: string) {
    super(message);
  }
}
