import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .listen(process.env.SERVER_PORT)
    .then(() =>
      console.log(`Nest Server is listening on port : ${process.env.SERVER_PORT}`),

    );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

