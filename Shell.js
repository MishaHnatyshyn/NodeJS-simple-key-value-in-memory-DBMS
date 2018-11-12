const readline = require('readline');
const shellParser = require('./ShellParser');

module.exports = class Shell {
  constructor(db){
    let state = {};
    this.getState = () => Object.assign({}, state);
    this.setState = newState => { state = newState };

    this.db = db;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    });

     this.rl.on('line', line => {
       line = line.trim();
       if(line === "exit"){
         this.rl.close();
       } else {
         console.dir(line);
         this.setState({input: line});
         this.checkCommand();
         this.rl.prompt();
       }
     });
  };

  checkCommand(){
    this.setState(shellParser(this.getState().input));
    const state = this.getState();
    
    if(state.case === 1) {
      this.db.handleCollectionCommand(state.command, state.body, state.collection)
    } else if (state.case === 2) {
      this.db.handleDBCommand(state.command, state.collection);
    } else {
      console.log('wrong command');
    }
  };

  listen(){
    this.rl.prompt();
  };
};