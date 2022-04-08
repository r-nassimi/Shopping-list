const express = require('express');
const router = express.Router();

const {
  getAllShops,
  createNewShop,
  changeShopInfo,
  deleteShop
} = require('/home/user/Documents/Work/module3/Shopping list/nodeJS/src/modules/controllers/task-controller');

router.get('/allShops', getAllShops);
router.post('/createShop', createNewShop);
router.patch('/updateShop', changeShopInfo);
router.delete('/deleteShop', deleteShop);

module.exports = router;