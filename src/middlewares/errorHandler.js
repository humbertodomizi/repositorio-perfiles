export const errorHandler = (error, req, res) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ message: error?.errors[0]?.message });
  }

  return res.status(500).json({ message: error.message });
};
