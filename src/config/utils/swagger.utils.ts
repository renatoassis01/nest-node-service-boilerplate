import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const swaggerCustom: SwaggerCustomOptions = {
  customSiteTitle: '4Tax - API',
  customfavIcon:
    'https://solucoesdefinitivas.com.br/site/wp-content/uploads/2017/02/icone-iphone.png',
  customCss: `
        .topbar-wrapper img {content:url('https://www.seidorbrasil.com.br/4tax/assets/img/logo-default-white.png'); width:300px; height:auto;}
        .swagger-ui .topbar { background-color: #115585; }`,
};

export class SwaggerUtils {
  public static setupSwaggerModule(
    app: INestApplication,
    apiPath: string,
  ): void {
    const config = new DocumentBuilder()
      .setTitle('Template Service')
      .setDescription('Template Service')
      .setVersion('1.0')
      .addTag('book')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(apiPath, app, document, swaggerCustom);
  }
}
