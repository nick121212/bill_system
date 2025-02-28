import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/modules/app/app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = (configService.get("base") || {}).port || 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  if (configService.get("base").env !== "production") {
    app.enableCors({
      origin: true,
      methods: "GET,HEAD,PUT,PATCH,DELETE,POST,OPTIONS",
      credential: true,
    });
  }

  await app.listen(port).then(() => {
    console.log("serer start on port: ", port);
  });

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}

bootstrap();
