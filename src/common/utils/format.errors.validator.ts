import { ValidationError } from 'class-validator';

// 4 niveis de erros
export class FormatErrorsValidator {
  public static format(data: ValidationError[]) {
    return data.map((s) => ({
      property: s.property,
      constraints: s.constraints,
      children: s.children.map((s2) => ({
        property: s2.property,
        constraints: s2.constraints,
        children: s2.children.map((s3) => ({
          property: s3.property,
          constraints: s3.constraints,
          children: s3.children.map((s4) => ({
            property: s4.property,
            constraints: s4.constraints,
          })),
        })),
      })),
    }));
  }
}
