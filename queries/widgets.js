const pg = require('pg-promise')()
const db = pg(`postgres://localhost:5432/widgets`)

module.exports = { create, retrieve, update, remove }

function create(req, res, next) {
  const amount = parseInt(req.body.amount);
  const name = req.body.name;

  db.none('insert into widgets(name, amount)' +
          'values(${name}, ${amount})', { name, amount })
    .then(() => {
      res.status(201)
        .json({
          status: 'success',
          message: 'Widget successfully created'
        });
    })
    .catch((err) => next(err));
}

function retrieve(req, res, next) {
  if (req.params.id) {
    var widgetId = parseInt(req.params.id);
    db.one('select * from widgets where id = $1', widgetId)
      .then((results) => {
        res.status(200)
          .json({
            status: 'success',
            results: results,
            message: `Retrieved single widget with ID = ${widgetId}`
          });
      })
      .catch((err) => next(err));
  } else {
    db.any('select * from widgets')
      .then((results) => {
        res.status(200)
          .json({
            status: 'success',
            results: results,
            message: 'All widgets retrieved'
          })
      })
      .catch((err) => next(err));
  }
}

function update(req, res, next) {
  const { name, amount } = req.body;

  db.none('update widgets set name=$1, amount=$2 where id=$3',
    [name, parseInt(amount), parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Widget successfully updated'
        });
    })
    .catch((err) => next(err));
}

function remove(req, res, next) {
  const widgetId = parseInt(req.params.id);

  db.result('delete from widgets where id = $1', widgetId)
    .then((results) => {
      console.log(results)
      res.status(200)
        .json({
          status: 'success',
          message: `Widget with ID = ${widgetId} successfully deleted. ${results.rowCount} widget deleted`
        });
    })
    .catch((err) => next(err));
}
