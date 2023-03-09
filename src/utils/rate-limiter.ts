import rateLimit from "express-rate-limit";
import { applicationConfig } from "../../config";

export const apiRateLimiter = rateLimit({
  windowMs: parseInt(applicationConfig.rateLimit.windowSizeMs),
  max: parseInt(applicationConfig.rateLimit.requestLimit),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (request, response, next, options) =>
    response.status(options.statusCode).send({
      success: false,
      message: "Failed to perform action",
      error: {
        message: options.message,
      },
    }),
});
