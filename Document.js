class Document {
  constructor(identifier, newData) {
    const data = {
      id: identifier
    };

    for (let key in newData){
      if (newData.hasOwnProperty(key)) data[key] = newData[key];
    }

    this.getId = () => id;

    this.getData = () => Object.assign({}, data);

    this.getFieldData = (field) => data[field];

    this.updateData = (field, newData) => {
      if (field !== id) data[field] = newData;
    };

    this.deleteField = (field) => {
      if(field in data && field !== 'id') delete data[field];
    }
  }
};

module.exports = Document;