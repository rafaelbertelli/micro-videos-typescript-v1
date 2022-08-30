import { faker } from "@faker-js/faker";
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { validate as uuidValidate } from "uuid";
import { setupSequelize } from "../testing/setup-sequelize";
import { SequelizeModelFactory } from "./sequeliize-model-factory";

@Table({})
class StubModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  static mockFactory = jest.fn(() => ({
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
  }));

  static factory() {
    return new SequelizeModelFactory<StubModel, { id: string; name: string }>(
      StubModel,
      StubModel.mockFactory
    );
  }
}

describe("Sequelize Model Factory", () => {
  setupSequelize({ models: [StubModel] });

  test("create method", async () => {
    let model = await StubModel.factory().create();

    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    let modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);

    model = await StubModel.factory().create({
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "test",
    });
    expect(model.id).toBe("9366b7dc-2d71-4799-b91c-c64adb205104");
    expect(model.name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);
  });

  test("make method", async () => {
    let model = StubModel.factory().make();

    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    model = StubModel.factory().make({
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "test",
    });
    expect(model.id).toBe("9366b7dc-2d71-4799-b91c-c64adb205104");
    expect(model.name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
  });

  test("bulkCreate with count = 1", async () => {
    let models = await StubModel.factory().bulkCreate();
    expect(models).toHaveLength(1);

    let model = models[0];
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    let modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);

    models = await StubModel.factory().bulkCreate(() => ({
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "test",
    }));
    expect(models).toHaveLength(1);

    model = models[0];
    expect(model.id).toBe("9366b7dc-2d71-4799-b91c-c64adb205104");
    expect(model.name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    modelFound = await StubModel.findByPk(model.id);
    expect(model.id).toBe(modelFound.id);
  });

  test("bulkCreate with count > 1", async () => {
    let models = await StubModel.factory().count(2).bulkCreate();
    expect(models).toHaveLength(2);

    expect(uuidValidate(models[0].id)).toBeTruthy();
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();

    expect(uuidValidate(models[1].id)).toBeTruthy();
    expect(models[1].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();

    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

    let modelFound1 = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(modelFound1.id);

    let modelFound2 = await StubModel.findByPk(models[1].id);
    expect(models[1].id).toBe(modelFound2.id);

    models = await StubModel.factory()
      .count(2)
      .bulkCreate(() => ({
        id: faker.datatype.uuid(),
        name: "test",
      }));

    expect(models).toHaveLength(2);

    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBe(models[1].id);
    expect(models[0].name).toBe("test");
    expect(models[1].name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
  });

  test("bulkMake method using count = 1", async () => {
    let models = StubModel.factory().bulkMake();

    expect(models).toHaveLength(1);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

    models = StubModel.factory().bulkMake(() => ({
      id: "5490020a-e866-4229-9adc-aa44b83234c4",
      name: "test",
    }));

    expect(models).toHaveLength(1);
    expect(models[0].id).toBe("5490020a-e866-4229-9adc-aa44b83234c4");
    expect(models[0].name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
  });

  test("bulkMake method using count > 1", async () => {
    let models = StubModel.factory().count(2).bulkMake();

    expect(models).toHaveLength(2);
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(models[1].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();
    expect(models[0].id).not.toBe(models[1].name);

    models = StubModel.factory()
      .count(2)
      .bulkMake(() => ({
        id: faker.datatype.uuid(),
        name: "test",
      }));

    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBe(models[1].id);
    expect(models[0].name).toBe("test");
    expect(models[1].name).toBe("test");
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
  });
});
