import { vi } from 'vitest'

import '@testing-library/jest-dom'

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn(() => {
    throw new Error('playback blocked')
  }),
})

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: vi.fn(),
})
