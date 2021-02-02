<template>
  <div class="bg-gray-200 rounded-lg column-width px-2 py-4 mr-2">
    <p>{{ title }}</p>
    <!-- task container -->
    <div>
      <div class="mt-2 bg-blue-400" draggable>taskA</div>
      <div class="mt-2 bg-blue-400" draggable>taskB</div>
      <div class="mt-2 bg-blue-400" draggable>taskC</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String
  }
});
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
</style>
