export function transferToBigCamelCase(name: string): string {
  if (name.length <= 1) return name.toUpperCase();

  if (name.includes('-')) {
    return name
      .split('-')
      .map((n) => transferToBigCamelCase(n))
      .join('');
  }

  return name.slice(0, 1).toUpperCase() + name.slice(1);
}
