// @flow
import React, { useState, useEffect } from 'react';
import { ButtonSwitch } from '../Button';
import {
  greetingTemplate,
  LABEL_TO_PAGE1,
  PLACEHOLDER_NAME
} from './constants';

const Header = ({ greetingWord }: { greetingWord: string }) => (
  <div>{greetingWord}</div>
);

type HomePropsType = {
  name: string,
  greeting: string
};

const Home = ({ name, greeting }: HomePropsType) => {
  const [greetingWord, setGreetingWord] = useState(
    greeting != null ? greeting : ''
  );

  useEffect(() => {
    if (!greeting) {
      setGreetingWord(greetingTemplate({ name }));
    }
  }, []);

  return (
    <div>
      <Header greetingWord={greetingWord} />
      <input
        style={{
          border: '1px solid',
          borderRadius: '5px',
          marginRight: '10px'
        }}
        onChange={({ target }) =>
          // to('home', {name: target.value})
          setGreetingWord(greetingTemplate({ name: target.value }))
        }
        placeholder={PLACEHOLDER_NAME}
      />
      <ButtonSwitch
        label={LABEL_TO_PAGE1}
        target="page1"
        targetProps={{ name: 'page1' }}
      />
    </div>
  );
};

Home.defaultProps = {
  name: 'World',
  greeting: ''
};

export default Home;
