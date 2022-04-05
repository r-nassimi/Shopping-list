const shop = require('/home/user/Documents/Work/module3/Shopping list/nodeJS/src/db/models/task/Index');

module.exports.getAllShops = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  shop.find().then(result => {
    res.send({ data: result });
  });
}

module.exports.createNewShop = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  const body = req.body;
  if ((body.hasOwnProperty('text') && body.hasOwnProperty('cost'))) {
    const shops = new shop({
      text: body.text,
      date: body.date,
      cost: body.cost
    })
    shops.save().then(result => {
      res.send({data: result});
    })
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.changeShopInfo = (req, res, next) => {
  const body = req.body;
  console.log(body._id)
  if ((body.hasOwnProperty('_id')) || (body.hasOwnProperty('text')) || (body.hasOwnProperty('date')) || (body.hasOwnProperty('cost'))) {
    shop.updateOne({_id: body._id}, 
        body
    ).then(result => {
      shop.find().then(result => {
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
    shop.findOneAndDelete({_id: id}).then(result => {
        shop.find().then(result => {
          res.send(result);
        })
    });
  } else {
    res.status(404).send('Error! Params not found');
  };
};
