import UserStore from './stores/UserStore';
import TodoStore from './stores/TodoStore';

export function createStore() {
  return {
    userStore: new UserStore(),
    todoStore: new TodoStore()
  };
}
