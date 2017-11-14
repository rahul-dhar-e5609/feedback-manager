//figures what set of credentials to return
//prod|dev
if(process.env.NODE_ENV === 'production'){
  //we are in production
  //return the prod set of keys
  module.exports = require('./prod');
}else{
  //we are in dev
  //return the dec set of keys
  module.exports = require('./dev');
}
