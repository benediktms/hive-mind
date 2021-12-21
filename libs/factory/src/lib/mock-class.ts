export function mockClass<T>(items: Partial<T> = {}): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.assign({}, items) as any;
}
