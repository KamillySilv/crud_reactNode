const router = require('express').Router();
const controller = require('../controllers/produto');
// const utils = require('../libs/utils');

router.get('/list', controller.list);
router.get('/:id', controller.item);
// router.put('/:id', controller.update)
router.post('/create', controller.create);
router.delete('/:id', controller.delete);

module.exports = router;
