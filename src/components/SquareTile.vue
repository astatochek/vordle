<script setup lang="ts">
import type { Tile } from '@/utils/model'
import { isNil } from "@/utils/functions";

defineProps<Tile>()
</script>

<template>
  <div class="border-2 w-10 h-10 text-xl text-center pt-1 uppercase font-bold" :class="{
    'bg-chinese-black border-onyx': status === 'empty' && isNil(char),
    'bg-chinese-black border-davys-grey': status === 'empty' && !isNil(char),
    'bg-onyx border-onyx': status === 'excluded',
    'bg-brass border-brass': status === 'included',
    'bg-middle-green border-middle-green': status === 'correct',
  }">{{ char }}</div>
</template>
