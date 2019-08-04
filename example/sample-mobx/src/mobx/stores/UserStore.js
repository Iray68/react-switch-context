import { action, observable } from "mobx";

class UserStore {
  @observable name = "Ray";
  @action
  changeName = name => {
    this.name = name;
  };
}

export default UserStore;
