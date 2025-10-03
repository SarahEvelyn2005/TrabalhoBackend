module.exports = function (requiredFields = []) {
  return (req, res, next) => {
    const missing = requiredFields.filter((f) => {
      // aceita valor 0, false; considera ausente null/undefined/''
      const v = req.body ? req.body[f] : undefined;
      return (
        v === undefined ||
        v === null ||
        (typeof v === "string" && v.trim() === "")
      );
    });
    if (missing.length) {
      return res
        .status(400)
        .json({ error: "Missing required fields", missing });
    }
    next();
  };
};
