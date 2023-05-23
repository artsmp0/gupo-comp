<script setup lang="ts">
import { useNamespace } from '@gupo/common';
import type { GupoTableProps } from './table.ts';
import { computed, ref, shallowRef } from 'vue';
import TableOptions from './components/table-options.vue';
import { useColumn } from './hooks/use-columns';
import { useDataSource } from './hooks/use-datasource';
import { useSelection } from './hooks/use-selection';
import HelpMessage from '../../help-message/src/help-message.vue';
import { Divider, Table } from 'ant-design-vue';
import { useScroll } from './hooks/use-scroll';

defineOptions({
  name: 'GupoTable',
});

const props = withDefaults(defineProps<GupoTableProps>(), {
  isShowHeader: true,
  rowKey: 'id',
  isKeepPageReload: true,
  isAutoFetch: true,
  headerOptions: () => ['size', 'fullscreen', 'reload', 'setting'],
  pagination: () => ({}),
  paginationKeys: () => ({
    current: 'page',
    pageSize: 'size',
    list: 'data.data',
    total: 'data.meta.total',
  }),
  sortConfig: () => ({
    field: { sortField: 'sortField', orderField: 'orderField' },
    order: { ascend: 'asc', descend: 'desc' },
  }),
});

const emitter = defineEmits<{
  expand: [record: any];
  change: [params: any];
}>();

const ns = useNamespace('table');
const cls = computed(() => [ns.b(), props.isWithParentHeight ? ns.m('full-height') : null]);
const size = ref(props.size);

const $tableContainer = shallowRef<HTMLDivElement>();
const { computedColumns } = useColumn(props);
const {
  dataSource,
  loading,
  computedPagination,
  filterList,
  handleChange,
  refresh,
  filterListWithOldParams,
} = useDataSource();
const { getSelectedData, setSelectedData, rowSelection, resetSelect } = useSelection(
  props.rowSelection
);
const { computedScroll } = useScroll($tableContainer, dataSource);

defineExpose({
  dataSource,
  /** 筛选列表 */
  filterList,
  /** 获取已选择数据 */
  getSelectedData,
  /** 清空选择 */
  resetSelect,
  /** 选中行 */
  setSelectedData,
  $tableContainer,
  refresh,
  filterListWithOldParams,
});
</script>

<template>
  <div ref="$tableContainer" :class="cls">
    <div v-if="props.isShowHeader" :class="ns.b('head')">
      <div :class="ns.be('head', 'title')">
        <slot name="tableTitle">
          <span>{{ props.title }}</span>
        </slot>
        <HelpMessage v-if="props.helpMessage" :message="props.helpMessage">
          <template #helpMessage>
            <slot name="helpMessage"></slot>
          </template>
        </HelpMessage>
      </div>
      <div>
        <slot name="customOperation"></slot>
        <Divider v-if="$slots.customOperation" :type="'vertical'" />
        <TableOptions
          v-model:size="size"
          :container="$tableContainer"
          :keep-page-reload="props.isKeepPageReload"
          :header-options="props.headerOptions"
          :filter-list="filterList"
          :columns="computedColumns"
        />
      </div>
    </div>
    <Table
      v-bind="$attrs"
      :columns="computedColumns"
      :data-source="dataSource"
      :loading="loading"
      :scroll="computedScroll"
      :pagination="computedPagination"
      :size="size"
      :row-selection="rowSelection"
      :row-key="props.rowKey"
      @change="handleChange"
      @expand="(_, record) => emitter('expand', record)"
    >
      <template v-for="(_, slotName) of $slots" :key="slotName" #[slotName]="data">
        <slot :name="slotName" v-bind="data || {}"></slot>
      </template>
      <template #headerCell="{ column, title }">
        <slot v-bind="{ title, column }" name="headerCell">
          <span>{{ title }}</span>
          <HelpMessage v-if="column.helpMessage" :message="column.helpMessage"> </HelpMessage>
        </slot>
      </template>
      <template #bodyCell="{ text, record, index, column }">
        <slot v-bind="{ text, record, index, column }" name="bodyCell"></slot>
      </template>
    </Table>
  </div>
</template>
