const router = require("express").Router();

const Potlucks = require("./model");

router.get("/", (req, res, next) => {
  Potlucks.getAll()
    .then((potluck) => {
      res.status(200).json(potluck);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
    Potlucks.getById(req.params.id)
      .then((potlucks) => {
        res.status(200).json(potlucks);
      })
      .catch(next);
  });


  router.get("/users/:user_id", (req, res, next) => {
    Potlucks.getByUserId(req.params.user_id)
      .then((potlucks) => {
        res.status(200).json(potlucks);
      })
      .catch(next);
  });

  router.post("/", (req, res, next) => {
    Potlucks.insert(req.body.user_id, req.body)
      .then((potluck) => {
        res.status(201).json(potluck);
      })
      .catch(next);
  });

  // router.delete("/:id", (req, res, next) => {
  //   Potlucks.getById(req.params.id)
  //     .then((potlucks) => {
  //       res.status(200).json(potlucks);
  //     })
  //     .catch(next);
  // });

module.exports = router
