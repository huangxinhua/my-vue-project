<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
}
</script>

<style>
header {
  width: 100%;
  height: 100px;
  background-color: #f00;
}
main {
  width: 100%;
  height: 400px;
  background-color: #0f0;
}
footer {
  width: 200%;
  height: 100px;
  background-color: #00f;
}
</style>

