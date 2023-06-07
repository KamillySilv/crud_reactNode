const router = require('express').Router();

router.use('/api/v1/produto', require('./produto'));

router.use((req, res, next) => {
    console.log(req.path, req.method, req.headers);
    res.status(404).json({success: false, msg: "página não encontrada"});
});

module.exports = router;