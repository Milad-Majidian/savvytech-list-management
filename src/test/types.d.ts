/// <reference types="vitest/globals" />

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        jest.Expect {}
  }
}

export {}