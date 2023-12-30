<script setup lang="ts">
import { useWordleStore } from '@/stores/wordle'
import { storeToRefs } from 'pinia'
import KeyTile from '@/components/KeyTile.vue'
import BackspaceIcon from "@/assets/BackspaceIcon.vue";

const store = useWordleStore()
const { keyboardFirstLine, keyboardSecondLine, keyboardThirdLine } = storeToRefs(store)
const { enterChar, enterWord, deleteChar } = store
</script>

<template>
  <section class="flex flex-col mt-2 justify-start items-center gap-1.5 w-full kb:w-[460px]">
    <div class="grid grid-cols-20 gap-1 w-full">
      <KeyTile
        v-for="key in keyboardFirstLine"
        :key="key.char"
        :char="key.char"
        :status="key.status"
        @key-click="() => enterChar(key.char)"
        class="col-span-2"
      />
      <div class="col-span-1" />
      <KeyTile
        v-for="key in keyboardSecondLine"
        :key="key.char"
        :char="key.char"
        :status="key.status"
        @key-click="() => enterChar(key.char)"
        class="col-span-2"
      />
      <div class="col-span-1" />
      <button
        class="rounded-sm bg-old-silver col-span-3 h-11 text-xs text-center font-bold"
        @click="enterWord"
      >
        Enter
      </button>
      <KeyTile
        v-for="key in keyboardThirdLine"
        :key="key.char"
        :char="key.char"
        :status="key.status"
        @key-click="() => enterChar(key.char)"
        class="col-span-2"
      />
      <button
        class="rounded-sm bg-old-silver col-span-3 h-11 flex justify-center items-center pr-1"
        @click="deleteChar"
      >
        <BackspaceIcon />
      </button>
    </div>
  </section>
</template>

<style>
.grid-cols-20 {
  grid-template-columns: repeat(20, minmax(0, 1fr));
}
</style>
