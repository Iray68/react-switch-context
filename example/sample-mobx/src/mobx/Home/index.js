import React, { Fragment } from 'react';
import { useStore } from '../stores';
import { observer, useLocalStore } from 'mobx-react';
import SubmittableInput from '../components/SubmittableInput';
import { PAGE_DETAIL } from '../constants';

const Home = observer(({ to }) => {
  const { userStore } = useStore();

  const store = useLocalStore(() => ({
    name: '',
    onChange(value) {
      this.name = value;
    }
  }));

  return (
    <Fragment>
      <div>{userStore.name}</div>
      <SubmittableInput
        onChange={store.onChange}
        value={store.name}
        onSubmit={userStore.changeName}
        labelBtn="Change Name"
      />
      <button onClick={() => to(PAGE_DETAIL)}>go to todo list page</button>
    </Fragment>
  );
});

export default Home;
