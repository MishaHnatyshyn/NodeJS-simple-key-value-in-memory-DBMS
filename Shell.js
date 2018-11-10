const readline = require('readline');

module.exports = class Shell {
  constructor(db){
    this.db = db;
     this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
     this.state = {
       input: '',
       collection: '',
       command: '',
       body: ''
     };
     this.regexp = {
       collectionCommand: /^[a-z]+\.[a-z]+\(.*\)$/,
       shellCommand: /^[a-z]+\(.*\)$/
     }
  };

  readLine(){
      this.rl.question('', (answer) => {
        if(answer === "exit"){
          this.rl.close();
        } else {
          console.dir(answer);
          this.state.input = answer;
          this.parse();
          this.readLine();
        }
      });
  };

  parse(){
    const { input } = this.state;
    const { collectionCommand, shellCommand } = this.regexp;
    let indexFirst = 0;
    let indexLast = 0;
    if(input.search(collectionCommand) > -1){
      indexLast = input.indexOf('.', indexFirst);
      this.state.collection = input.substring(indexFirst, indexLast);
      indexFirst = indexLast + 1;
      indexLast = input.indexOf('(', indexFirst);
      this.state.command = input.substring(indexFirst, indexLast);
      indexFirst = indexLast + 1;
      indexLast = input.indexOf(')', indexFirst);
      this.state.body = input.substring(indexFirst, indexLast);
      console.dir(this.state);
      this.db.handleCollectionCommand(this.state.command, this.state.body, this.state.collection)
    } else if (input.search(shellCommand) > -1){
        indexLast = input.indexOf('(', indexFirst);
        this.state.command = input.substring(indexFirst, indexLast);
        indexFirst = indexLast + 1;
        indexLast = input.indexOf(')');
        this.state.collection = input.substring(indexFirst, indexLast);
        this.db.handleDBCommand(this.state.command, this.state.collection);
      console.dir(this.state);
    } else {
      console.log('wrong command');
    }
  }

  listen(){
    this.readLine();
  }
};