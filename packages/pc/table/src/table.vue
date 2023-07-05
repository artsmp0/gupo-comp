<script setup lang="ts">
import { useNamespace } from '@gupo/common';
import type { GupoTableProps } from './table'

defineOptions({
  name: 'GupoTable',
});

const props = withDefaults(defineProps<GupoTableProps>(), {})

const ns = useNamespace('table');
</script>

<template>
  <div></div>
</template>
