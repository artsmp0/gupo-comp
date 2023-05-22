<script setup lang="ts">
import { useNamespace } from '@gupo/common';
import type { <%= prefixPascalName %>Props } from './<%= name %>.ts'

defineOptions({
  name: '<%= prefixPascalName %>',
});

const props = withDefaults(defineProps<<%= prefixPascalName %>Props>(), {})

const ns = useNamespace('<%= name %>');
</script>

<template>
  <div></div>
</template>
