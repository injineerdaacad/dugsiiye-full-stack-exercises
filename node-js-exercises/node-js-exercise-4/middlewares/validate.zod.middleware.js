const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.errors = result.error.issues.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    throw error;
  }

  req.body = result.data;
  next();
};

export default validate;
