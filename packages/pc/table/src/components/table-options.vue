<script lang="ts" setup>
import { Space, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import { useFullscreen } from '@vueuse/core';
import { useNamespace, type Nullable, type Recordable } from '@gupo/common';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import type { MenuClickEventHandler } from 'ant-design-vue/es/menu/src/interface';
import {
  SettingOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  ExpandOutlined,
} from '@ant-design/icons-vue';
import { toRef } from 'vue';
import type { HeaderOptions } from '../table';
import HelpMessage from '../../../help-message/src/help-message.vue';
import ColumnSetPopper from './column-set-popper.vue';

const props = defineProps<{
  container: Nullable<HTMLDivElement>;
  headerOptions: HeaderOptions;
  size: SizeType;
  keepPageReload: boolean;
  filterList: (params?: Recordable, resetPage?: boolean) => void;
}>();
const enum Events {
  'updateSize' = 'update:size',
}
type Emitter = {
  (e: Events.updateSize, size: SizeType): void;
};
const emitter = defineEmits<Emitter>();
const container = toRef(props, 'container');
const { toggle } = useFullscreen(container);

const colHeightMap = [
  { key: 'large', text: '默认' },
  { key: 'middle', text: '中等' },
  { key: 'small', text: '紧凑' },
];

const handleClickSize: MenuClickEventHandler = e => {
  emitter(Events.updateSize, e.key as SizeType);
};
const handleReload = () => {
  if (props.keepPageReload) {
    props.filterList(undefined, false);
  } else {
    props.filterList();
  }
};

const ns = useNamespace('table');
const iconCls = ns.be('options', 'icon');
</script>

<template>
  <Space :size="16">
    <Dropdown :trigger="'click'" placement="bottom">
      <HelpMessage :placement="'top'" message="密度">
        <ColumnHeightOutlined v-if="props.headerOptions.includes('size')" :class="iconCls" />
      </HelpMessage>
      <template #overlay>
        <Menu :selected-keys="[props.size!]" @click="handleClickSize">
          <MenuItem v-for="item in colHeightMap" :key="item.key"> {{ item.text }}</MenuItem>
        </Menu>
      </template>
    </Dropdown>
    <HelpMessage :placement="'top'" message="全屏">
      <ExpandOutlined
        v-if="props.headerOptions.includes('fullscreen')"
        :class="iconCls"
        @click="toggle"
      />
    </HelpMessage>
    <HelpMessage :placement="'top'" message="刷新">
      <ReloadOutlined
        v-if="props.headerOptions.includes('reload')"
        :class="iconCls"
        @click="handleReload"
      />
    </HelpMessage>
    <ColumnSetPopper>
      <HelpMessage :placement="'top'" message="设置">
        <SettingOutlined v-if="props.headerOptions.includes('setting')" :class="iconCls" />
      </HelpMessage>
    </ColumnSetPopper>
  </Space>
</template>
