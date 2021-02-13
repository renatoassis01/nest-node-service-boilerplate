export class TransformUtils {
  public static ToBoolean(value: any): boolean {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return value;
    }
  }
}
