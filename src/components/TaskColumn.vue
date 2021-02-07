<template>
  <article
    class="bg-gray-200 rounded-lg column-width px-2 py-4 mr-2"
    @drop="dropEmit($event, columnType)"
    @dragover.prevent
    @dragenter.prevent
  >
    <p>{{ columnType }}</p>
    <!-- task container -->
    <ul>
      <li
        v-for="item in statusByTodos"
        :key="item.id"
        class="mt-2 bg-blue-400"
        draggable="true"
        @dragstart="dragList($event, item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const TASK_ID_KEY = "list-id";

export default defineComponent({
  props: {
    columnType: {
      type: String as PropType<TodoStatus>,
      required: true
    },
    statusByTodos: {
      type: Object as PropType<TodoItem>,
      required: true
    }
  },
  emits: ["dropList"],
  setup(_, { emit }) {
    // drag開始時のイベント処理
    const dragList = (event: DragEvent, taskId: string) => {
      const dataTransfer = event?.dataTransfer;
      if (!dataTransfer) {
        return;
      }
      dataTransfer.effectAllowed = "move";
      dataTransfer.dropEffect = "move";
      dataTransfer.setData(TASK_ID_KEY, taskId);
    };
    // drop時のイベント処理
    const dropEmit = (event: DragEvent, status: string) => {
      const dataTransfer = event?.dataTransfer;
      if (!dataTransfer) {
        return;
      }
      const dragId = dataTransfer.getData(TASK_ID_KEY);
      emit("dropList", dragId, status);
    };
    return {
      dragList,
      dropEmit
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
