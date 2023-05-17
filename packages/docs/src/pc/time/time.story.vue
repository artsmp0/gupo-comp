<script lang="ts" setup>
const time = Date.now() - 30 * 1000;
</script>

<template>
  <Story
    title="时间格式化"
    icon="material-symbols:alarm-add-outline"
    :layout="{
      type: 'grid',
      width: 300,
    }"
  >
    <Variant title="相对时间静态">
      <GupoTime class="primary" :time="time" :mode="'relative'" />
    </Variant>
    <Variant title="动态变化相对时间">
      <GupoTime class="warning" :time="time" :mode="'relative'" :step="1" />
    </Variant>
    <Variant title="相对时间，可以设置步长，此处为 3 s">
      <GupoTime class="success" :time="time" :mode="'relative'" :step="3" />
    </Variant>
    <Variant title="格式化为日期+时间">
      <GupoTime class="error" :time="time" :mode="'datetime'" />
    </Variant>
    <Variant title="格式化为日期">
      <GupoTime :time="time" :mode="'date'" />
    </Variant>
  </Story>
</template>

<style lang="less" scoped>
.primary {
  color: @primary-color;
}
.warning {
  color: @warning-color;
}
.error {
  color: @error-color;
}
.success {
  color: @success-color;
}
</style>
