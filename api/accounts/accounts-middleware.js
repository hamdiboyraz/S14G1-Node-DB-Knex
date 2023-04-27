const accountsController = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    let { name, budget } = req.body;
    name = name?.trim();

    // name = "foo";
    // budget = NaN;

    if (typeof name === "undefined" || typeof budget === "undefined") {
      return res.status(400).json({ message: "name and budget are required" });
    }

    if (typeof budget !== "number" || isNaN(budget)) {
      return res
        .status(400)
        .json({ message: "budget of account must be a number" });
    }

    if (name.length < 3 || name.length > 100) {
      return res
        .status(400)
        .json({ message: "name of account must be between 3 and 100" });
    }

    if (budget < 0 || budget > Math.pow(10, 6)) {
      return res
        .status(400)
        .json({ message: "budget of account is too large or too small" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let { name } = req.body;
    name = name.trim();
    const account = await accountsController.getByName(name);
    if (account) {
      return res.status(400).json({ message: "that name is taken" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const { id } = req.params;
    const account = await accountsController.getById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
