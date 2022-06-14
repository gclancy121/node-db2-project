// DO YOUR MAGIC
const Cars = require('./cars-model');
const router = require('express').Router();

router.get('/', (req, res) => {
  Cars.getAll().then(cars => {
    res.status(200).json(cars);
  })
})

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({message: error.message, stack: error.stack});
});

module.exports = router;