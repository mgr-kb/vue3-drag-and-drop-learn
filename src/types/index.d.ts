type TodoStatus = "Todo" | "InProgress" | "Done";
type Item = {
  id: string;
  name: string;
  status: TodoStatus;
};

type TodoItem = {
  name: TodoStatus;
};
