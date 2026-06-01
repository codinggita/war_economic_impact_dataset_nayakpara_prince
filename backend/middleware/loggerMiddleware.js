/**
 * Request Logging Middleware
 * Logs every incoming request with method, URL, IP, and timestamp.
 * Only logs detailed info in development mode.
 */
const logger = (req, res, next) => {
  const start = Date.now();

  // Log incoming request
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  if (process.env.NODE_ENV === "development") {
    console.log(`[${timestamp}] ${method} ${url} — IP: ${ip}`);
  }

  // Log response when finished
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    if (process.env.NODE_ENV === "development") {
      const statusColor =
        statusCode >= 500
          ? "\x1b[31m" // red
          : statusCode >= 400
          ? "\x1b[33m" // yellow
          : statusCode >= 300
          ? "\x1b[36m" // cyan
          : "\x1b[32m"; // green

      console.log(
        `[${timestamp}] ${method} ${url} — ${statusColor}${statusCode}\x1b[0m — ${duration}ms`
      );
    }
  });

  next();
};

module.exports = { logger };
