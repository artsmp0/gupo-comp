<script setup lang="ts">
import { ref, watch } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import { formatToDate, formatToDateTime, relativeTime } from './_utils';
import type { TimeProps } from './time';

defineOptions({
  name: 'GupoTime',
});

const props = withDefaults(defineProps<TimeProps>(), {
  mode: 'datetime',
});

const formatTime = ref('');

function formatDate() {
  let str = '';
  switch (props.mode) {
    case 'date':
      str = formatToDate(props.time);
      break;
    case 'datetime':
      str = formatToDateTime(props.time);
      break;
    case 'relative':
      str = relativeTime(props.time);
      break;
    default:
      break;
  }
  formatTime.value = str;
}

props.step && props.mode === 'relative' && useIntervalFn(formatDate, 1000 * props.step);

watch(
  () => props.time,
  () => {
    formatDate();
  },
  { immediate: true }
);
</script>

<template>
  <span>{{ formatTime }}</span>
</template>
