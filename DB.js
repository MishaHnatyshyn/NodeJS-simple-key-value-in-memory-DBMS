const Collection = require('./Collection');

module.exports = class DB{
  constructor(){
    this.collections = [];
  }

  create(name){
    this.collections.push(new Collection(name));
  };

  handleCollectionCommand(command, data, collection){
    this.collections.forEach(item => {
      if (item.getName() === collection) {
        console.log('handleCollectionCommand', 'command: ' + command, 'data: ' + data, 'collection: ' + collection);
        if (command in item) item[command](JSON.parse(data));
      }
    })
  };

  handleDBCommand(command, collection){
    console.log('handleDBCommand', 'command: ' + command, 'collection: ' + collection);
    this[command](collection);
  };

  drop(name){
    for (let i = 0; i < this.collections.length; i++){
      if(this.collections[i].getName() === name) {
        this.collections.splice(i, 1);
        break;
      }
    }
  };

  show() {
    console.dir(this.collections.map((item) => item.getName()))
  }
};