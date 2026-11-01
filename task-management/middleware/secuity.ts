import type { Express } from "express";
import helmet from "helmet";

export const configureSecurity = (app: Express): void => {
  app.disable("x-powered-by");

  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts:
        process.env.NODE_ENV === "production"
          ? {
              maxAge: 31536000,
              includeSubDomains: true,
              preload: true,
            }
          : false,
      referrerPolicy: {
        policy: "no-referrer",
      },
      frameguard: {
        action: "deny",
      },
      crossOriginResourcePolicy: {
        policy: "same-site",
      },
    }),
  );
};