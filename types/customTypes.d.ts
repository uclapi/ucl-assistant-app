// for @testing-library/jest-native

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeDisabled(): R,
      toContainElement(element: ReactTestInstance | null): R,
      toBeEmpty(): R,
      toHaveProp(attr: string, value?: any): R,
      toHaveTextContent(
        text: string | RegExp,
        options?: { normalizeWhitespace: boolean, }
      ): R,
      toBeEnabled(): R,
      toHaveStyle(
        style: Record<string,
          unknown>[] | Record<string, unknown>
      ): R,
    }
  }
}
