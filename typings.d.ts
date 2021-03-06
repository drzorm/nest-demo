/* eslint-disable spaced-comment */
type BIZ_ENV = 'local' | 'dev' | 'test' | 'prod';

declare namespace NodeJS {
  export interface ProcessEnv {
    BIZ_ENV: BIZ_ENV;
    PORT: string;
    [k: string]: string;
  }
}
