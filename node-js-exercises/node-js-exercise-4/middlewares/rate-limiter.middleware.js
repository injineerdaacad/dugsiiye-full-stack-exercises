import rateLimit from "express-rate-limit";
import rateLimitConfig from "../config/rate-limit.js";

const rateLimiter = rateLimit({
  ...rateLimitConfig,
  handler: (req, res, next) => {
    const error = new Error("Too many requests. Please try again later.");
    error.statusCode = 429;

    if (req.rateLimit?.resetTime) {
      error.details = {
        retryAfter: `${Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000)}s`,
      };
    }

    next(error);
  },
});

export default rateLimiter;
