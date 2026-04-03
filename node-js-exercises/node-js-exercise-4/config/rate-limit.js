const isProduction = process.env.NODE_ENV === "production";

const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 100 : 1000, // 100 requests per 15 minutes in production, 1000 in development
  standardHeaders: true,
  legacyHeaders: false,
};

export default rateLimitConfig;
