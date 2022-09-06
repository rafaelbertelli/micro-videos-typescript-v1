import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { configEnv } from "../config";

const sequelizeOptions: SequelizeOptions = {
  dialect: configEnv.db.vendor,
  host: configEnv.db.host,
  logging: configEnv.db.logging,
};

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  beforeAll(
    () =>
      (_sequelize = new Sequelize({
        ...sequelizeOptions,
        ...options,
      }))
  );

  beforeEach(async () => {
    await _sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await _sequelize.close();
  });

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}
