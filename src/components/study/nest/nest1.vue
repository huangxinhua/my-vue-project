<template>
  <div>
    <span>{{nest1C}}</span>
    <nest11 :nest11C='nest11C'></nest11>
  </div>
</template>
<script>
import nest11 from "./nest1-1";
export default {
  props: {
    nest1C: {
      type: String,
      default: "nest1"
    }, nest11C: {
      type: String,
      default: "nest11cd"
    }
  }, components: {
    nest11
  }
}
</script>