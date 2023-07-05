<script setup lang="ts">
import { useNamespace } from '@gupo/common';
import type { GupoSearchBarProps } from './search-bar'

defineOptions({
  name: 'GupoSearchBar',
});

const props = withDefaults(defineProps<GupoSearchBarProps>(), {})

const ns = useNamespace('search-bar');
</script>

<template>
  <div></div>
</template>
