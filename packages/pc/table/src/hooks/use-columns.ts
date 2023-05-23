import { cloneDeep } from 'lodash-es';
import type { InjectionKey, ShallowRef, WritableComputedRef } from 'vue';
import { computed, provide, shallowRef } from 'vue';
import type { GupoTableProps, TableColumns } from '../table';
import { TableProps } from 'ant-design-vue/es/table';

export const columnSettingKey = Symbol() as InjectionKey<{
  columns: WritableComputedRef<TableColumns>;
  originColumns: ShallowRef<TableColumns>;
}>;

export function useColumn(props: GupoTableProps) {
  const originColumns = shallowRef(
    cloneDeep(
      props.columns?.map(col => ({
        ...col,
        dataIndex: col?.dataIndex || col.key,
        customCell:
          col.customCell ||
          // 表示需要行合并
          ((data, _, column) => {
            if (col.needRowSpan) return { rowSpan: data[`${column?.dataIndex}RowSpan`] };
            return {};
          }),
      }))
    ) as TableColumns
  );
  const usedColumns = shallowRef(originColumns.value);

  const computedColumns = computed({
    get: () => {
      return usedColumns.value;
    },
    set: v => {
      usedColumns.value = v;
    },
  });

  provide(columnSettingKey, { columns: computedColumns, originColumns });

  return {
    computedColumns: computedColumns as unknown as TableProps['columns'],
  };
}
