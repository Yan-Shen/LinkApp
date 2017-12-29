
const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {
  Transaction.findAll({
      where: {
        userId: +req.params.userId
      }
    //
  })
    .then(transactions => res.json(transactions))
    .catch(next)
})
