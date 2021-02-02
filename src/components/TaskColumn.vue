<template>
  <div class="bg-gray-200 rounded-lg column-width px-2 py-4 mr-2">
    <p>{{ title }}</p>
    <!-- task container -->
    <ul>
      <li
        v-for="item in data"
        :key="item.id"
        class="mt-2 bg-blue-400"
        draggable="true"
        @dragstart="dragList($event, item.id)"
      >
        {{ item.name }}
      </li>
      <!-- <div class="mt-2 bg-blue-400" draggable>taskA</div>
      <div class="mt-2 bg-blue-400" draggable>taskB</div>
      <div class="mt-2 bg-blue-400" draggable>taskC</div> -->
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    title: String
  },
  setup() {
    const data = reactive([
      { id: "1", name: "TaskA", status: "Todo" },
      { id: "2", name: "TaskB", status: "In Progree" },
      { id: "3", name: "TaskC", status: "Done" }
    ]);
    // drag開始時のイベント処理
    const dragList = (event: DragEvent, taskId: string) => {
      console.log(taskId);
      // dataTransferは必ず存在すると仮定
      event.dataTransfer!.effectAllowed = "move";
      event.dataTransfer!.dropEffect = "move";
      event.dataTransfer!.setData("list-id", taskId);
    };
    return {
      data,
      dragList
    };
  }
});
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
</style>
