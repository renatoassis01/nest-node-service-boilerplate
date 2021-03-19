import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ISwaggerconfig } from '../interfaces/swagger.config';

const swaggerCustom: SwaggerCustomOptions = {
  customSiteTitle: 'Orbit - API',
  customfavIcon:
    'https://solucoesdefinitivas.com.br/site/wp-content/uploads/2017/02/icone-iphone.png',
  customCss: `
        .topbar-wrapper img {content:url('https://www.seidorbrasil.com.br/4tax/assets/img/logo-default-white.png'); width:300px; height:auto;}
        .swagger-ui .topbar { background-color: #115585; }`,
};

export class SwaggerUtils {
  public static setupSwaggerModule(config: ISwaggerconfig): void {
    const setup = new DocumentBuilder()
      .setTitle(config.title)
      .setDescription(config.description)
      .setVersion(config.version)
      .addTag(config.tag.name, config.tag.description, config.tag.externalDocs)
      .build();
    const document = SwaggerModule.createDocument(config.app, setup);
    SwaggerModule.setup(config.apiPath, config.app, document, swaggerCustom);
  }
}
