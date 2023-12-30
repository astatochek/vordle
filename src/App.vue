<script setup lang="ts">
import { useWordleStore } from '@/stores/wordle'
import { storeToRefs } from 'pinia'
import { fromEvent } from 'rxjs'
import { isChar, isCurrentLine } from "@/utils/functions";
import SquareCard from '@/components/SquareTile.vue'
import KeyboardSection from '@/components/KeyboardSection.vue'

const store = useWordleStore()
const { boardAsList, curRow, shake } = storeToRefs(store)
const { enterChar, enterWord, deleteChar } = store

fromEvent(document, 'keydown').subscribe((event) => {
  const { key } = event as KeyboardEvent
  if (isChar(key)) enterChar(key)
  else if (key === 'Enter') enterWord()
  else if (key === 'Backspace') deleteChar()
})
</script>

<template>
  <main class="flex h-dvh min-h-fit w-full text-cultured items-around justify-center kb:items-center kb:justify-center">
    <div class="flex flex-col justify-end kb:justify-start items-center w-full">
      <h1 class="text-2xl font-bold">Vordle</h1>
      <hr class="h-px mt-2 w-full bg-cultured/50 border-0" />
      <section class="flex mt-2 justify-center items-center">
        <div class="grid grid-cols-5 gap-1">
          <SquareCard
            v-for="(square, index) in boardAsList"
            :key="index"
            :char="square.char"
            :status="square.status"
            :shake="shake && isCurrentLine(curRow, index)"
          />
        </div>
      </section>
      <KeyboardSection />
    </div>
  </main>
</template>
