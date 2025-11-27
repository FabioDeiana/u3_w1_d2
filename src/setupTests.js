// setupTests.js
import "@testing-library/jest-dom"

// Mock per fetch se necessario
global.fetch = jest.fn()

// Reset dei mock dopo ogni test
afterEach(() => {
  jest.clearAllMocks()
})
