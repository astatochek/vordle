import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { MAX_NUM_ROWS, WORD_LENGTH, WORDS } from '@/utils/constants'
import type { Char, Key, Tile } from '@/utils/model'
import type { Ref } from 'vue'
import {
  createDefaultBoard,
  createDefaultKeyboard,
  getCharCounts,
  isNil,
  isRowEmpty
} from '@/utils/functions'
import { Chars } from '@/utils/model'

export const useWordleStore = defineStore('wordle', () => {
  const hiddenWord = WORDS[Math.floor(Math.random() * WORDS.length)]
  const hiddenWordCharCounts = getCharCounts(hiddenWord)

  const curRow = ref(0)
  const curCol = ref(0)

  const board: Ref<Tile[][]> = ref(createDefaultBoard())
  const keyboard: Ref<Key[]> = ref(createDefaultKeyboard())

  const isGameFinished = ref(false)

  const boardAsList = computed(() => board.value.reduce((acc, row) => acc.concat(row), []))

  const keyboardFirstLine = computed(() => keyboard.value.slice(0, 10))
  const keyboardSecondLine = computed(() => keyboard.value.slice(10, 19))
  const keyboardThirdLine = computed(() => keyboard.value.slice(19, 26))

  function enterWord() {
    if (isGameFinished.value || isRowEmpty(board.value[curRow.value])) return

    validateLine(curRow.value)

    if (board.value[curRow.value].every(({ status }) => status === 'correct')) {
      isGameFinished.value = true
    }

    curRow.value++
    curCol.value = 0

    if (curRow.value === MAX_NUM_ROWS) {
      isGameFinished.value = true
    }
  }

  function enterChar(char: Char): void {
    if (isGameFinished.value || isRowFilled(curCol.value)) return
    board.value[curRow.value][curCol.value].char = char
    curCol.value++
  }

  function deleteChar(): void {
    if (isGameFinished.value || isRowStart(curCol.value)) return
    curCol.value--
    board.value[curRow.value][curCol.value].char = void 0
  }

  function validateLine(line: number): void {
    const cloneCharCounts = structuredClone(hiddenWordCharCounts)
    const word = board.value[line] as Key[]

    word.forEach(({ char }, index) => {
      if (char === hiddenWord[index]) {
        keyboard.value[Chars.indexOf(char)].status = 'correct'
        board.value[line][index].status = 'correct'
        cloneCharCounts[char] -= 1
      }
    })

    word.forEach(({ char }, index) => {
      const isCorrect = char === hiddenWord[index]
      const isStillIncluded = cloneCharCounts[char] > 0
      if (!isCorrect && isStillIncluded) {
        keyboard.value[Chars.indexOf(char)].status = 'included'
        board.value[line][index].status = 'included'
        cloneCharCounts[char] -= 1
      }
    })

    word.forEach(({ char }, index) => {
      const isNotMarkedInLine = board.value[line][index].status === 'empty'
      const isNotMarkedInKeyboard = keyboard.value[Chars.indexOf(char)].status === 'excluded'
      if (isNotMarkedInLine) {
        board.value[line][index].status = 'excluded'
        if (isNotMarkedInKeyboard) {
          keyboard.value[Chars.indexOf(char)].status = 'excluded'
        }
      }
    })
  }

  function isRowFilled(curCol: number): boolean {
    return curCol >= WORD_LENGTH
  }

  function isRowStart(curCol: number): boolean {
    return curCol === 0
  }

  return {
    boardAsList,
    keyboardFirstLine,
    keyboardSecondLine,
    keyboardThirdLine,
    enterWord,
    enterChar,
    deleteChar
  }
})
