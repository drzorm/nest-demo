/* eslint-disable spaced-comment */
declare namespace NodeJS {
  export interface ProcessEnv {
    BIZ_ENV: string;
    PORT: string;
    [k: string]: string
  }
}
