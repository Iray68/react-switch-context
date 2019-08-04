import { observable, action } from "mobx";

class TodoStore {
  @observable todos = [];

  @action
  addTodoList = todo => {
    this.todos.push(todo);
  };
}

export default TodoStore;
