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
        collection[command](data);
      }
    })
  };

  handleDBCommand(command, collection){
    this[command](collection);
  };

  drop(name){
    for (let i = 0; i < this.collections.length; i++){
      if(collection[i].getName() === name) {
        this.collections.splice(i, 1);
        break;
      }
    }
  };

  show() {
    console.dir(this.collections.map((item) => item.getName()))
  }
};