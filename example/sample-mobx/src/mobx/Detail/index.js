import { observer, useLocalStore } from "mobx-react";
import { useStore } from "../stores";
import { Fragment } from "react";
import React from "react";
import SubmittableInput from "../components/SubmittableInput";

const Detail = observer(() => {
  const { todoStore } = useStore();

  const store = useLocalStore(() => ({
    value: "",
    onChange(value) {
      this.value = value;
    }
  }));

  return (
    <Fragment>
      {todoStore.todos.map((todo, index) => (
        <div key={`${todo}${index}`}>{todo}</div>
      ))}
      <SubmittableInput
        onChange={store.onChange}
        value={store.value}
        onSubmit={todoStore.addTodoList}
        labelBtn="Add"
      />
    </Fragment>
  );
});

export default Detail;
