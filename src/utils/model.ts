export type Nil = null | undefined

export type Square = {
  char: Char | Nil
  status: 'empty' | 'excluded' | 'included' | 'correct'
}

export const Chars = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
] as const

export type Char = (typeof Chars)[number]
