export function transferToBigCamelCase(name: string): string {
  if (name.length <= 1) return name.toUpperCase();

  return name.slice(0, 1).toUpperCase() + name.slice(1);
}
