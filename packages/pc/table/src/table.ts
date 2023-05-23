import { ColumnType, TableProps } from 'ant-design-vue/es/table';

export type SortConfig = {
  field: { sortField: string; orderField: string };
  order: { ascend: string; descend: string };
};

export type PaginationKeys = { current: string; pageSize: string; list: string; total: string };

/** 表格列配置：支持对象键提示 */
export interface TableColumn<RecordType = any> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  /** 固定操作列名称为：operation */
  dataIndex: keyof RecordType | 'operation';
  /** 表头单元格帮助信息（? 号图标 + tooltip 的形式） */
  helpMessage?: string;
  /** 是否默认隐藏列 */
  notShow?: boolean;
  /** 是否需要进行行合并 */
  needRowSpan?: boolean;
}

export type TableColumns<RecordType = any> = TableColumn<RecordType>[];

export type HeaderOptions = ('size' | 'fullscreen' | 'reload' | 'setting')[];

export type GupoTableProps = {
  columns: TableColumns;
  /** 表格标题 */
  title?: string;
  helpMessage?: string;
  isShowHeader?: boolean;
  headerOptions?: HeaderOptions;
  scroll?: TableProps['scroll'];
  paginationKeys: PaginationKeys;
  pagination?: TableProps['pagination'];
  rowKey?: TableProps['rowKey'];
  sortConfig?: SortConfig;
  size?: TableProps['size'];
  rowSelection?: TableProps['rowSelection'];
  isKeepPageReload?: boolean;
  isAutoFetch?: boolean;
  isWithParentHeight?: boolean;
  resolveData?: (data: any) => any;
  /** 获取接口数据 */
  listApi: (...args: any[]) => Promise<any>;
};
