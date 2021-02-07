<template>
  <main>
    <h1 class="text-indigo-500">Vue 3 Drag and Drop</h1>
    <section class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">
        <TaskColumn
          columnType="Todo"
          :statusByTodos="statusIsTodo"
          @dropList="dropList"
        />
        <TaskColumn
          columnType="InProgress"
          :statusByTodos="statusIsProgress"
          @dropList="dropList"
        />
        <TaskColumn
          columnType="Done"
          :statusByTodos="statusIsDone"
          @dropList="dropList"
        />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import TaskColumn from "@/components/TaskColumn.vue";

export default defineComponent({
  components: {
    TaskColumn
  },
  setup() {
    const data = reactive<Item[]>([
      { id: "1", name: "TaskA", status: "Todo" },
      { id: "2", name: "TaskB", status: "InProgress" },
      { id: "3", name: "TaskC", status: "Done" },
      { id: "4", name: "TaskD", status: "Todo" },
      { id: "5", name: "TaskE", status: "InProgress" },
      { id: "6", name: "TaskF", status: "Done" },
      { id: "7", name: "TaskG", status: "Todo" },
      { id: "8", name: "TaskH", status: "InProgress" },
      { id: "9", name: "TaskI", status: "Done" }
    ]);
    const statusIsTodo = computed<Item[]>(() =>
      data.filter(item => item.status === "Todo")
    );
    const statusIsProgress = computed<Item[]>(() =>
      data.filter(item => item.status === "InProgress")
    );
    const statusIsDone = computed<Item[]>(() =>
      data.filter(item => item.status === "Done")
    );
    // drop時のイベント処理
    const dropList = (...args: [string, string]) => {
      const dragId = args[0];
      const status = args[1] as TodoStatus;
      const dragItem = data.find(item => item.id === dragId);
      if (dragItem != null) {
        dragItem.status = status;
      }
    };
    return {
      statusIsTodo,
      statusIsProgress,
      statusIsDone,
      dropList
    };
  }
});
</script>
