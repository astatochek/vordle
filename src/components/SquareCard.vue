<script setup lang="ts">
import type { Square } from '@/utils/model'

defineProps<Square>()
</script>

<template>
  <div class="border-2 border-red-700 w-20 h-20" :class="{
    'bg-chinese-black': status === 'empty',
    'bg-onyx': status === 'excluded',
    'bg-brass': status === 'included',
    'bg-middle-green': status === 'correct'
  }">{{ char }}</div>
</template>
