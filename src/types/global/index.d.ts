declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    PORT: string;
    SECRET: string;
    MONGODBURI: string;
    REDIS_URI: string;
    REDIS_PASSWORD: string;
    REDIS_PORT: string;
  }
}
