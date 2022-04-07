const Shop = require('./db/models/task/Index');

module.exports.getAllShops = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  Shop.find().then(result => {
    res.send({ data: result });
  });
}

module.exports.createNewShop = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const body = req.body;
  if ((body.hasOwnProperty('text') && body.hasOwnProperty('cost'))) {
    const shops = new Shop(body);
    shops.save().then(result => {
      res.status(200).send({data: result});
    })
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.changeShopInfo = (req, res, next) => {
  const body = req.body;
  if ((body.hasOwnProperty('_id')) || (body.hasOwnProperty('text')) || (body.hasOwnProperty('date')) || (body.hasOwnProperty('cost'))) {
    Shop.updateOne(
      {_id: body._id}, 
      {$set: {body}}
    ).then(result => {
      Shop.find().then(result => {
        res.send(result)
      })
    });
  } else {
    res.status(422).send('Error! Params not correct');
  };
};

module.exports.deleteShop = (req, res, next) => {
  const id = req.query._id;
  if (id) {
    Shop.findOneAndDelete({_id: id}).then(result => {
        Shop.find().then(result => {
          res.send(result);
        });
    });
  } else {
    res.status(404).send('Error! Params not found');
  };
};