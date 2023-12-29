<script setup lang="ts">
import type { Tile } from '@/utils/model'
import { isNil } from "@/utils/functions";

defineProps<Tile & { shake: boolean }>()
</script>

<template>
  <div class="border-2 w-10 h-10 text-xl text-center pt-1 uppercase font-bold" :class="{
    'bg-chinese-black border-onyx': status === 'empty' && isNil(char),
    'bg-chinese-black border-davys-grey': status === 'empty' && !isNil(char),
    'bg-onyx border-onyx': status === 'excluded',
    'bg-brass border-brass': status === 'included',
    'bg-middle-green border-middle-green': status === 'correct',
    shake: shake
  }">{{ char }}</div>
</template>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
