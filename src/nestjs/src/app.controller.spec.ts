import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule;
  let configService: ConfigService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: join(__dirname, './envs/.env.test'),
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    configService = app.get(ConfigService);

    // console.log(app.get(ConfigService).get('DB_VENDOR'));
  });

  describe('root', () => {
    it('should be able to get environment variables', () => {
      expect(configService.get('DB_VENDOR')).toBeDefined();
      expect(configService.get('DB_HOST')).toBeDefined();
      expect(configService.get('DB_LOGGING')).toBeDefined();
      expect(configService.get('DB_AUTO_LOAD_MODELS')).toBeDefined();
    });

    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
