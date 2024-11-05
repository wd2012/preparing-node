declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userName: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Jwt {}
}
