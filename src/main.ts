require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  // https://github.com/mde/ejs/wiki/Using-EJS-with-Express
  app.set('view options', { debug: false });
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.use(cookieParser());
  app.use(
    session({
      store: new FileStore(),
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 30, httpOnly: true },
      rolling: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
