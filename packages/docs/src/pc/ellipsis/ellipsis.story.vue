<script lang="ts" setup>
import '../../../../pc/ellipsis/style';
import { ConfigProvider, Button } from 'ant-design-vue';

const shortStr = 'Lorem ipsum dolor sit';
const longStr =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique possimus quae doloremque rerum hic laudantium rem dolore quia, vel aliquam eligendi consequuntur fugiat officia unde, tenetur qui, optio provident exsdfsdf!';

const longChinese =
  '北国风光，千里冰封，万里雪飘。望长城内外，惟余莽莽；大河上下，顿失滔滔。(余 通：馀)山舞银蛇，原驰蜡象，欲与天公试比高。(原驰 原作：原驱)须晴日，看红装素裹，分外妖娆。(红装 一作：银装)江山如此多娇，引无数英雄竞折腰。惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。一代天骄，成吉思汗，只识弯弓射大雕。俱往矣，数风流人物，还看今朝。';
</script>

<template>
  <Story
    title="文本省略"
    icon="octicon:ellipsis-16"
    auto-props-disabled
    :layout="{
      type: 'grid',
      width: 300,
    }"
  >
    <Variant title="短文本">
      <div class="content">
        <ConfigProvider
          :theme="{
            token: {
              colorPrimary: '#ff1717',
            },
          }"
        >
          <GupoEllipsis :text="shortStr" />
          <Button type="primary">按钮</Button>
        </ConfigProvider>
      </div>
    </Variant>
    <Variant title="单行省略">
      <div class="content">
        <GupoEllipsis :text="longStr" />
      </div>
    </Variant>
    <Variant title="不显示Tooltip">
      <div class="content">
        <GupoEllipsis :text="longStr" :show-tooltip="false" />
      </div>
    </Variant>
    <Variant title="弹框位置">
      <div class="content">
        <GupoEllipsis :text="longStr" placement="topLeft" />
      </div>
    </Variant>
    <Variant title="多行省略">
      <div class="content">
        <GupoEllipsis :text="longStr" :line="3" />
      </div>
    </Variant>
    <Variant title="提示框背景颜色">
      <div class="content">
        <GupoEllipsis :text="longStr" :line="3" color="pink" />
      </div>
    </Variant>
    <Variant title="点击展开">
      <div class="content">
        <GupoEllipsis
          :text="longStr"
          :line="3"
          :show-tooltip="false"
          color="#ff8738"
          :expand-trigger="'click'"
        />
      </div>
    </Variant>
    <Variant title="点击展开（中文）">
      <div class="content" style="font-size: 20px">
        <GupoEllipsis
          :text="longChinese"
          :line="2"
          :show-tooltip="false"
          color="#ff8738"
          :expand-trigger="'click'"
        />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.content {
  width: 200px;
}
</style>
