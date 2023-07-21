/* eslint-disable @typescript-eslint/no-explicit-any */
import { canDone } from './task.service'

describe('TaskService', () => {
  describe('canDone()', () => {
    describe.each([
      { status: 'open', expected: true },
      { status: 'blocked', expected: false },
      { status: 'done', expected: false },
      { status: '', expected: false },
      { status: undefined, expected: false },
      { status: null, expected: false }
    ])('with status $status', ({ status, expected }) => {
      it(`returns ${expected}`, () => {
        expect(canDone({ title: 'Save Martha', status: status as any })).toBe(
          expected
        )
      })
    })
  })
})
