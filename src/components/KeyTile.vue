<script setup lang="ts">
import type { Key } from '@/utils/model'

defineProps<Key>()
</script>

<template>
  <button
    class="rounded-sm h-11 text-base text-center pt-0.5 uppercase font-bold"
    :class="{
      'bg-old-silver': status === 'empty',
      'bg-onyx': status === 'excluded',
      'bg-brass': status === 'included',
      'bg-middle-green': status === 'correct'
    }"
    @click="$emit('keyClick')"
  >
    {{ char }}
  </button>
</template>
