<script lang="ts" setup>
import { TableColumns } from '@gupo/pc-components/table/src/table';

const getUser = (params: { pageSize: number; current: number }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          list: Array.from({ length: params.pageSize }).map((_, index) => ({
            name: `我是随机名字${index * params.current}`,
            age: index,
            male: index % 2 === 0,
          })),
          pagination: {
            total: 10000,
          },
        },
      });
    }, 1000);
  });
};
const columns: TableColumns = [
  {
    dataIndex: 'name',
    title: '姓名',
    helpMessage: '这是帮助消息',
  },
  {
    dataIndex: 'age',
    title: '年龄',
  },
  {
    dataIndex: 'male',
    title: '性别',
  },
  {
    dataIndex: 'operation',
    title: '操作',
    fixed: 'right',
    width: 150,
  },
];
</script>

<template>
  <!-- auto-props-disabled：禁用自动生成 props，复杂组件建议禁用 -->
  <!-- title用 / 分割，histoire 会自动进行匹配成组 -->
  <!-- icon可以到 https://icones.netlify.app/ 上面去找，不写也可以 -->
  <!-- 一个 story 可以有多个 Variant 组件，我们可以定义一些常用的示例，以 Button 为例：可能会有：基本用法，图标按钮... -->
  <Story title="表格组件/演示" icon="carbon:table-built" auto-props-disabled>
    <!-- initState 必须要是一个函数，返回初始状态 -->
    <Variant title="playground">
      <div style="height: 100vh">
        <GupoTable
          title="我是表格标题"
          :columns="columns"
          :list-api="getUser"
          :pagination-keys="{
            current: 'current',
            list: 'list',
            pageSize: 'pageSize',
            total: 'pagination.total',
          }"
        >
        </GupoTable>
      </div>
    </Variant>
  </Story>
</template>
