// bc prisma doesn't support exclude fields, BRUH!!!
// https://www.prisma.io/docs/concepts/components/prisma-client/excluding-fields
export default function exclude<T, Key extends keyof T>(
  obj: T,
  keys: Key[],
): Omit<T, Key> {
  if (obj && keys.length > 0) {
    for (const key of keys) {
      delete obj[key];
    }
  }
  return obj;
}
