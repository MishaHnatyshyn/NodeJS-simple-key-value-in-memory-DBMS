//GavnoCode
// export default class Parser{
//   getKeys = (string) => Object.keys(JSON.parse(string));
//   getValues = (string) => Object.values(JSON.parse(string));
//   parseToObject = (string) => JSON.parse(string);
// }

const chooseType = string => (
  +string || string === 'true' || string === 'false' || string
);

export default class Parser1{
  parseToObject = str => {
    const res = {};
    str = str.trim().replace(/[{}]/g);
    if (str.includes(',')){
      const arr = str.split(',');
      arr.forEach((item, i)=>{
        let temp = item.split(':');
        res[temp[0]] = chooseType(temp[1])
      })
    } else {
      let temp = str.split(':');
      res[temp[0]] = chooseType(temp[1])
    }
    return res;
  }
}