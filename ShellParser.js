const regexp = {
  collectionCommand: /^[a-z]+\.[a-zA-Z]+\(.*\)$/,
  shellCommand: /^[a-z]+\(.*\)$/
};

const shellParser = line => {
  const { collectionCommand, shellCommand } = regexp;
  let indexFirst = 0;
  let indexLast = 0;
  const res = {
    input: line,
    collection: '',
    command: '',
    body: '',
    case: 0
  };
  if(line.search(collectionCommand) > -1){
    indexLast = line.indexOf('.', indexFirst);
    res.collection = line.substring(indexFirst, indexLast);

    indexFirst = indexLast + 1;
    indexLast = line.indexOf('(', indexFirst);
    res.command = line.substring(indexFirst, indexLast);

    indexFirst = indexLast + 1;
    indexLast = line.indexOf(')', indexFirst);
    res.body = line.substring(indexFirst, indexLast);

    res.case = 1;
    return res;
  } else if (line.search(shellCommand) > -1){
    indexLast = line.indexOf('(', indexFirst);
    res.command = line.substring(indexFirst, indexLast);

    indexFirst = indexLast + 1;
    indexLast = line.indexOf(')');
    res.collection = line.substring(indexFirst, indexLast);

    res.case = 2;
    return res;
  } else {
    return res;
  }
};

module.exports = shellParser;