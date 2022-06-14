const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

async function checkCarId(req, res, next) {
  // DO YOUR MAGIC
  Cars.getById(req.params.id).then(result => {
    if (result == null) {
      res.status(404).json({message:`car with id ${req.params.id} is not found`});
      return;
    }
  }).catch(err => next(err));
  next();
}
function checkCarPayload(req, res, next){
 const vin = req.body.vin;
 const make = req.body.make;
 const model = req.body.model;
 const mileage = req.body.mileage;
 if (vin == null) {
  res.status(400).json({message: 'vin is missing'});
  return;
 }
 if (make == null) {
  res.status(400).json({message: 'make is missing'});
  return;
 }
 if (model == null) {
  res.status(400).json({message: 'model is missing'});
  return;
 }
 if (mileage == null) {
  res.status(400).json({message: 'mileage is missing'});
  return;
 }
 next();
}

function checkVinNumberValid(req, res, next) {
  const vin = req.body.vin;
 if (vinValidator.validate(vin) === false) {
  res.status(400).json({message: `vin ${vin} is invalid`});
  return;
 }
 next();
  // DO YOUR MAGIC
}

async function checkVinNumberUnique(req, res, next) {
  // DO YOUR MAGIC
  await Cars.getAll().then(result => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].vin === req.body.vin) {
        res.status(400).json({message: `vin ${req.body.vin} already exists`});
        return;
      }
    }
    next();
  })
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
