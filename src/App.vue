<script setup lang="ts">
import { useWordleStore } from '@/stores/wordle'
import { storeToRefs } from 'pinia'
import SquareCard from '@/components/SquareCard.vue'
import { Chars } from '@/utils/model'

const store = useWordleStore()
const { boardAsList } = storeToRefs(store)
const { enterChar, enterWord } = store
</script>

<template>
  <section class="flex justify-center items-center">
    <div class="grid grid-cols-5">
      <SquareCard
        v-for="(square, index) in boardAsList"
        :key="index"
        :char="square.char"
        :status="square.status"
      />
    </div>
  </section>
  <section class="flex flex-row">
    <button
      class="border border-white w-8 h-8"
      v-for="(char, index) in Chars"
      :key="index"
      @click="() => enterChar(char)"
    >
      {{ char }}
    </button>
  </section>
  <section>
    <button class="bg-red-950" @click="() => enterWord()">ENTER</button>
  </section>
</template>

<style scoped></style>
