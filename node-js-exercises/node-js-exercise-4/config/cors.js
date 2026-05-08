const allowedOrigins = process.env.ALLOWED_ORIGINS
  ?.split(",")
  .map((origin) => origin.trim()) || [];

const corsOptions = allowedOrigins.length > 0
  ? { origin: allowedOrigins }
  : {};

export default corsOptions;
