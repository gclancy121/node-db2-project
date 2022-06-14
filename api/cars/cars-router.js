// DO YOUR MAGIC
const Cars = require('./cars-model');
const {checkCarId, checkVinNumberValid, checkCarPayload, checkVinNumberUnique } = require('./cars-middleware');

const router = require('express').Router();

router.get('/', (req, res) => {
  Cars.getAll().then(cars => {
    res.status(200).json(cars);
  })
})

router.get('/:id', checkCarId, (req, res, next) => {
  Cars.getById(req.params.id).then(result => {
    res.status(200).json(result);
  }).catch(err => next(err));
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
  Cars.create(req.body).then(result => {
    res.status(201).json(result);
  }).catch(err => next(err));
})

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({message: error.message, stack: error.stack});
});

module.exports = router;