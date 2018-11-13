const Document = require('./Document');

module.exports = class Collection{
  constructor(name){
    this.name = name;
    this.documents = [];
    this.creationTime = new Date();
    this.lastChange = new Date();
  }

  getName(){
    return this.name;
  };

  getDocumentsCount(){
    return this.documents.length;
  };

  getCreationTime(){
    return this.creationTime;
  };

  getLastChangeTime(){
    return this.lastChange;
  };

  find(query, filter){
    const result = this.documents.filter(document => this.matchQuery(document, query));
    if (filter && Object.keys(filter) > 0) {
      return result.map(document => {
        let obj = {};
        for (const key in filter) {
          if (filter[key]) obj = Object.assign({ [key]: document[key] }, obj)
        }
        return obj
      })
    } else return result;
  };

  findOne(query, filter){
    for (const document of this.documents){
      if (this.matchQuery(document, query)) {
        if (!filter) {
          return document;
        } else {
          let obj = {};
          for (const key in filter) {
            if (filter[key]) obj = Object.assign({ [key]: document[key] }, obj)
          }
          return obj
        }
      }
    }
    return null;
  }

  findById(id, filter){
    for (const document of this.documents){
      if (document.id === id && !filter) {
        return document;
      } else if (document.id === id && filter) {
        let obj = {};
        for (const key in filter) {
          if (filter[key]) obj = Object.assign({ [key]: document[key] }, obj)
        }
        return obj
      }
    }
    return null;
  }

  validate(data){
    if (Object.keys(data).length !== Object.keys(this.documents[0]).length) return false;
    Object.keys(this.documents[0]).forEach(key => {
      if (!data.hasOwnProperty(key)) return false;
    });
    return true;
  };

  insertOne(data) {
    if (!this.validate(data)) throw new Error('Invalid Object');
    this.documents.push(Object.assign({ id: this.documents.length }, data))
  };

  insertMany (dataSet)  {
    dataSet.forEach((data) => {
      if (!this.validate(data)) throw new Error('Invalid Object');
      this.documents.push(Object.assign({ id: this.documents.length }, data))
    })
  };

  deleteOne(query) {
    for (let i = 0; i<this.documents.length; i++){
      if (this.matchQuery(this.documents[i], query)) {
        this.documents.splice(i, 1);
        return;
      }
    }
  };

  deleteMany(query){
    this.documents = this.documents.filter(document => !this.matchQuery(document, query))
  };

  matchQuery(document, query){
    for (const key in query) {
      if (document[key] !== query[key]) return false;
    }
    return true;
  };

  updateOne(query){
    for (const document of this.documents){
      if (this.matchQuery(document)){
        for (const key in query){
          if (query.hasOwnProperty(key)) document[key] = query[key];
        }
        return document;
      }
    }
  };

  updateMany(query) {
    for (const document of this.documents){
      if (this.matchQuery(document)){
        for (const key in query){
          if (document.hasOwnProperty(key)) document[key] = query[key];
        }
      }
    }
    return this.documents.filter(document => this.matchQuery(document, query))
  }

};
