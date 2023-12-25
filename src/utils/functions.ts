import type { Nil, Square } from '@/utils/model'
import { MAX_NUM_ROWS, WORD_LENGTH } from '@/utils/constants'

export function isNil(v: unknown): v is Nil {
  return v == null
}

export function isRowEmpty(row: Square[]): boolean {
  return row.map(({ char }) => char).filter(isNil).length > 0
}

export function createDefaultBoard(): Square[][] {
  return Array(MAX_NUM_ROWS)
    .fill(void 0)
    .map(() =>
      Array(WORD_LENGTH)
        .fill(void 0)
        .map(() => ({
          char: void 0,
          status: 'empty'
        }))
    )
}
