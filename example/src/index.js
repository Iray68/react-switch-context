import React, { lazy } from 'react';
import ReactDom from 'react-dom';
import Switch, { Screen } from '../../src/index';
import Button from './Button';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './Home/index'));

export default ReactDom.render(
  <Switch
    notFoundView={_ => <div>404 no found</div>}
    loadingView={<div>Loading...</div>}
  >
    <Screen viewComponent={Home} name="home" initialProps={{ name: 'Home' }} />
    <Screen
      viewComponent={({ to, name }) => (
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '400px' }}
        >
          <input
            style={{
              border: '1px solid',
              borderRadius: '5px',
              margin: '10px 0'
            }}
            onChange={({ target }) => to('page1', { name: target.value })}
            placeholder="input name passed to context's viewProps for re-rendering"
          />
          <Button
            onClick={e => to('home', { name: 'Ray' })}
            label={`Back to Home (from ${name})`}
          />
        </div>
      )}
      name="page1"
    />
  </Switch>,
  document.getElementById('app')
);
