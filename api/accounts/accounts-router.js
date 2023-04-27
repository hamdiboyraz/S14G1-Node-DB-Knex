const accountsController = require("./accounts-model");
const accountsMiddleware = require("./accounts-middleware");
const router = require("express").Router();

// GET All Accounts
router.get("/", async (req, res, next) => {
  try {
    // throw new Error("hello");
    const accounts = await accountsController.getAll();
    return res.status(200).json(accounts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET Account
router.get(
  "/:id",
  accountsMiddleware.checkAccountId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const account = await accountsController.getById(id);
      res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  }
);

// Create Account
router.post(
  "/",
  accountsMiddleware.checkAccountPayload,
  accountsMiddleware.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      let { name, budget } = req.body;
      name = name.trim();
      const newAccount = await accountsController.create({ name, budget });
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  }
);

// Update Account
router.put(
  "/:id",
  accountsMiddleware.checkAccountPayload,
  accountsMiddleware.checkAccountId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, budget } = req.body;
      const updatedAccount = await accountsController.updateById(id, {
        name,
        budget,
      });
      res.status(200).json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

// Delete Account
router.delete(
  "/:id",
  accountsMiddleware.checkAccountId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await accountsController.deleteById(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
