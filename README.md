# react-switch-context

A tiny library that switch react component around the React Context API.

## Get Started

Use the command line:

    npm install react-switch-context --save

Or

    yarn add react-switch-context

## Usage

```JSX
import React from 'react';
import { render } from 'react-dom';
import Switch, { Screen } from 'react-switch-context';

export default render(
  <Switch
    notFoundView={_ => <div>404 no found</div>}
    loadingView={<div>Loading...</div>}
  >
     <Screen
       viewComponent={({ to, name }) => (
         <div>
           <button onClick={e => to('page1', { name: 'two' })}>to page1</button>
         </div>

       )}
       initialProps={ demo: 'demo' }
       name="home"
     />
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
           <button onClick={e => to('home', { name: 'Ray' })}>
            {`to home(${name})`}
           </button>
         </div>
       )}
       name="page1"
     />
  </Switch>,
  document.getElementById('app')
);
```

Or **_Download the project, using command line:_**

```
    npm run example
```

```
    yarn example
```

and open the src/index.html.

## Properties (Screen)

|    Properties     |      Type       | Default | Required? |
| :---------------: | :-------------: | :-----: | :-------: |
|     **name**      |     string      |         |     ✓     |
| **viewComponent** | React.Component |         |     ✓     |
|   initialProps    |     Object      |   {}    |           |

## Properties (Switch)

|  Properties  |      Type       |      Default       | Required? |
| :----------: | :-------------: | :----------------: | :-------: |
| **children** |     Screen      |                    |     ✓     |
|   rootView   |     string      | first-child's name |           |
| notFoundView | React.Component |                    |           |
| loadingView  | React elements  |                    |           |

## Function and View Props

Screen Component will pass initialProps and to() into viewComponent.

| Function Name |       Parameter       |                                        Action                                        |
| :-----------: | :-------------------: | :----------------------------------------------------------------------------------: |
|      to       | (viewName, viewProps) | Switch to Screen by viewName and override the Component initial props with viewProps |

TODO:

- [ ] Complete basic guidelines.
- [ ] More complicated example on Demo website.
