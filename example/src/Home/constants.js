// @flow
const taggedTemplate = (
  strings: Array<string>,
  ...keys: Array<number | string>
) => {
  return (...values: Array<any>) => {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];

    keys.forEach((key, i) => {
      let value = Number.isInteger(key) ? values[parseInt(key)] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
};

export const greetingTemplate = taggedTemplate`Hello, ${'name'}!`;
export const PLACEHOLDER_NAME = 'Name';
export const LABEL_TO_PAGE1 = 'to Page1';
