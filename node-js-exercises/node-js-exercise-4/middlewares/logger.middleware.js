import morgan from "morgan";
import { strftime } from "../utility/util.js";

morgan.token("date_time", () => strftime());

const morganFormat = ":date_time | :method :url :status :response-time ms";

const logger = (req, res, next) => {
  if (process.env.NODE_ENV !== "development") {
    return next();
  }

  return morgan(morganFormat)(req, res, next);
};

export default logger;
