<script setup lang="ts">
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useNamespace } from '@gupo/common';
import { Tooltip } from 'ant-design-vue';
import type { TooltipPlacement } from 'ant-design-vue/es/tooltip';

defineOptions({
  name: 'GupoHelpMessage',
});

const props = withDefaults(
  defineProps<{
    message: string;
    placement?: TooltipPlacement;
  }>(),
  {
    placement: 'bottom',
  }
);
const ns = useNamespace('help-message');
</script>

<template>
  <Tooltip
    :placement="props.placement"
    :get-popup-container="triggerNode => triggerNode.parentElement!"
  >
    <template #title>
      <span :class="ns.b()">
        <slot name="helpMessage">{{ props.message }}</slot>
      </span>
    </template>
    <slot>
      <QuestionCircleOutlined />
    </slot>
  </Tooltip>
</template>
