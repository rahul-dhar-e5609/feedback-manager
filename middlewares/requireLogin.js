//next is the function we call when our middleware is
//done processing
//to call the next middleware in the chain
module.exports = (req, res, next) => {
  if(!req.user){
    //forbidden 401
    return res.status(401).send({error: 'You must log in'});
  }
  next();
}
