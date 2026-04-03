const allowedOrigins = process.env.ALLOWED_ORIGINS
  ?.split(",")
  .map((origin) => origin.trim()) || [];

const corsOptions = process.env.NODE_ENV === "production"
  ? { origin: allowedOrigins }
  : {};

export default corsOptions;
