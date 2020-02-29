<template>
  <div>
    <ul>
      <li v-for="item in persons"
          :key="item.id">
        <!-- 子组件通过作用域插槽传给父组件 -->
        <slot :row="item" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["persons"]
};
</script>

<style>
</style>
