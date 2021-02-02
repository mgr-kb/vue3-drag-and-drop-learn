<template>
  <div>
    <h1 class="text-indigo-500">{{ msg }}</h1>
    <div class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">
        <TaskColumn title="Todo" />
        <TaskColumn title="In Progress" />
        <TaskColumn title="Done" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskColumn from "@/components/TaskColumn.vue";

export default defineComponent({
  components: {
    TaskColumn
  },
  props: {
    msg: String
  }
});
</script>
