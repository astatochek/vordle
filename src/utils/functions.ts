import type { Nil, Tile, Char, CharCounts, Key } from "@/utils/model";
import { Chars } from '@/utils/model'
import { MAX_NUM_ROWS, WORD_LENGTH } from '@/utils/constants'

export function isNil(v: unknown): v is Nil {
  return v == null
}

export function isChar(v: any): v is Char {
  return Chars.includes(v)
}

export function isRowEmpty(row: Tile[]): boolean {
  return row.map(({ char }) => char).filter(isNil).length > 0
}

export function createDefaultBoard(): Tile[][] {
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

export function createDefaultKeyboard(): Key[] {
  return Chars.map((char) => ({
    char,
    status: 'empty'
  }))
}

export function getCharCounts(words: string): CharCounts {
  const charCounts = getBaseCharCount()
  words.split('').forEach((char) => charCounts[char as Char]++)
  return charCounts
}

export function getBaseCharCount(): CharCounts {
  return Chars.reduce((counts, char) => {
    counts[char] = 0
    return counts
  }, {} as CharCounts)
}
