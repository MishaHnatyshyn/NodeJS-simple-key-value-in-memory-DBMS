export default class Parser{
  getKeys = (string) => Object.keys(JSON.parse(string));
  getValues = (string) => Object.values(JSON.parse(string));
  parseToObject = (string) => JSON.parse(string);
}
