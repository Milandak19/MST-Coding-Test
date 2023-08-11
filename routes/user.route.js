module.exports = (app) => {
  const { verifyToken } = require("../middlewares/auth.middleware");
  const user = require("../controllers/user.controller");
  const multer = require("multer");

  var router = require("express").Router();
  const upload = multer({ storage: multer.memoryStorage() });

  router.post("/signup", upload.single("photo"), user.signup);

  router.post("/signin", user.signin);

  router.post("/signout", user.signout);
  router.use(verifyToken);
  router.get("/", (req, res) => res.status(200).send(req.user));

  app.use("/api/auth", router);
};
