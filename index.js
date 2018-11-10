const Shell = require('./Shell');
const DB = require('./DB');

const db = new DB();
const shell = new Shell(db);
shell.listen();