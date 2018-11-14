const chooseType = string => (
  +string || string === 'true' || string === 'false' || string
);

class Parser{
  parseToObject(str) {
    if (typeof str !== 'string') return;
    const res = {};
    str = str.trim().replace(/[{}]/g, '');
    if (str.includes(',')){
      const arr = str.split(',');
      arr.forEach((item)=>{
        let temp = item.split(':');
        res[temp[0].trim()] = chooseType(temp[1].trim())
      })
    } else {
      let temp = str.split(':');
      res[temp[0].trim()] = chooseType(temp[1].trim());
    }
    return res;
  }
}

const Parser1 = new Parser();
console.dir(Parser1.parseToObject('{a: b, b : 3, a: 3}'));