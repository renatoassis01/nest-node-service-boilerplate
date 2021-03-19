import { INestApplication } from '@nestjs/common';
import { ExternalDocumentationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface ISwaggerconfig {
  app: INestApplication;
  apiPath: string;
  title: string;
  description: string;
  version: string;
  tag: {
    name: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
  };
}
