import { strftime } from "../utility/util.js";

const logger = (req, res, next) => {
  console.log(`${strftime()} | ${req.method} ${req.originalUrl}`);
  next();
};

export default logger;