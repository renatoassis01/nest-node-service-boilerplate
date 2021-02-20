export class TransformUtils {
  public static ToBoolean(value: any): boolean {
    const { obj, key } = value;
    switch (obj[key]) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return obj[key];
    }
  }
}
