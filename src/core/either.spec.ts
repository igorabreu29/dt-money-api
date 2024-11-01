import { expect, test } from 'vitest'
import { type Either, left, right } from './either'

function doSomething(value: boolean): Either<string, number> {
  if (value) {
    return right(20)
  }

  return left('error')
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('success result', () => {
  const result = doSomething(false)

  expect(result.isRight()).toBe(false)
  expect(result.isLeft()).toBe(true)
})
