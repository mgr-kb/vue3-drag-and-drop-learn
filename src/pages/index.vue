<template>
  <div>
    <h1 class="text-indigo-500">{{ msg }}</h1>
    <div class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">
        <!-- TODO -->
        <div
          class="bg-gray-200 rounded-lg column-width px-2 py-4 mr-2"
          @drop="dropList($event, 'Todo')"
          @dragover.prevent
          @dragenter.prevent
        >
          <p>TODO</p>
          <!-- task container -->
          <ul>
            <li
              v-for="item in statusIsTodo"
              :key="item.id"
              class="mt-2 bg-blue-400"
              draggable="true"
              @dragstart="dragList($event, item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- In Progress -->
        <div
          class="bg-gray-200 rounded-lg column-width px-2 py-4 mr-2"
          @drop="dropList($event, 'InProgress')"
          @dragover.prevent
          @dragenter.prevent
        >
          <p>In Progress</p>
          <!-- task container -->
          <ul>
            <li
              v-for="item in statusIsProgress"
              :key="item.id"
              class="mt-2 bg-blue-400"
              draggable="true"
              @dragstart="dragList($event, item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- Done -->
        <div
          class="bg-gray-200 rounded-lg column-width px-2 py-4 mr-2"
          @drop="dropList($event, 'Done')"
          @dragover.prevent
          @dragenter.prevent
        >
          <p>Done</p>
          <!-- task container -->
          <ul>
            <li
              v-for="item in statusIsDone"
              :key="item.id"
              class="mt-2 bg-blue-400"
              draggable="true"
              @dragstart="dragList($event, item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- <TaskColumn title="Todo" />
        <TaskColumn title="In Progress" />
        <TaskColumn title="Done" /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
// import TaskColumn from "@/components/TaskColumn.vue";

/**
 * dataTransferなど、nullableな値も必ずあると仮定
 */
export default defineComponent({
  // components: {
  //   TaskColumn
  // },
  props: {
    msg: String
  },
  setup() {
    const data = reactive([
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
    const statusIsTodo = computed(() =>
      data.filter(item => item.status === "Todo")
    );
    const statusIsProgress = computed(() =>
      data.filter(item => item.status === "InProgress")
    );
    const statusIsDone = computed(() =>
      data.filter(item => item.status === "Done")
    );
    // drag開始時のイベント処理
    const dragList = (event: DragEvent, taskId: string) => {
      console.log(taskId);
      event.dataTransfer!.effectAllowed = "move";
      event.dataTransfer!.dropEffect = "move";
      event.dataTransfer!.setData("list-id", taskId);
    };
    // drop時のイベント処理
    const dropList = (event: DragEvent, status: string) => {
      const dragId = event.dataTransfer!.getData("list-id");
      const dragItem = data.find(item => item.id === dragId);
      dragItem!.status = status;
    };
    return {
      statusIsTodo,
      statusIsProgress,
      statusIsDone,
      dragList,
      dropList
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
