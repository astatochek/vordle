export type Nil = null | undefined

export type Tile = {
  char: Char | Nil
  status: Status
}

export type Key =  {
  char: Char
  status: Status
}

export type Status = 'empty' | 'excluded' | 'included' | 'correct'

export const Chars = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
  'z', 'x', 'c', 'v', 'b', 'n', 'm'
] as const

export type Char = (typeof Chars)[number]

export type CharCounts = {
  [key in Char]: number
}
