import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { MAX_NUM_ROWS, WORD_LENGTH, WORDS } from '@/utils/constants'
import type { Char, Square } from '@/utils/model'
import type { Ref } from 'vue'
import { createDefaultBoard, isNil, isRowEmpty } from '@/utils/functions'

export const useWordleStore = defineStore('wordle', () => {
  const hiddenWord = WORDS[Math.floor(Math.random() * WORDS.length)]

  const curRow = ref(0)
  const curCol = ref(0)

  const board: Ref<Square[][]> = ref(createDefaultBoard())

  const isGameFinished = computed(() => curRow.value > MAX_NUM_ROWS)

  const boardAsList = computed(() => board.value.reduce((acc, row) => acc.concat(row), []))

  function enterWord() {
    if (isGameFinished.value || isRowEmpty(board.value[curRow.value])) return
    validateLine(curRow.value)
    curCol.value = 0
    curRow.value++
  }

  function enterChar(char: Char): void {
    if (isGameFinished.value || isRowFilled(curCol.value)) return
    board.value[curRow.value][curCol.value].char = char
    curCol.value++
  }

  function deleteChar(): void {
    if (isGameFinished.value || isRowStart(curCol.value)) return
    board.value[curRow.value][curCol.value].char = void 0
  }

  function validateLine(line: number): void {
    const word = board.value[line]
    board.value[line] = word.map(({ char }, index) => {
      if (char === hiddenWord[index]) return { char, status: 'correct' }
      if (hiddenWord.includes(char!)) return { char, status: 'included' }
      return { char, status: 'excluded' }
    })
  }

  function isRowFilled(curCol: number): boolean {
    return curCol > WORD_LENGTH
  }

  function isRowStart(curCol: number): boolean {
    return curCol === 0
  }

  return { boardAsList, curRow, curCol, enterWord, enterChar, deleteChar }
})
