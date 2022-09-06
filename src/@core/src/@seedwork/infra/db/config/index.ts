import { config as readEnv } from "dotenv";
import { join } from "path";

type Config = {
  db: {
    vendor: any;
    host: string;
    logging: boolean;
  };
};

function makeConfig(envFile): Config {
  const output = readEnv({ path: envFile });

  return {
    db: {
      vendor: output.parsed.DB_VENDOR,
      host: output.parsed.DB_HOST,
      logging: output.parsed.DB_LOGGING === "true",
    },
  };
}

const envTestingFile = join(__dirname, "../../../../../.env.test");
const envProdFile = join(__dirname, "../../../../../.env.test");

const getEnvFile =
  process.env.NODE_ENV === "production" ? envProdFile : envTestingFile;

export const configEnv = makeConfig(getEnvFile);
