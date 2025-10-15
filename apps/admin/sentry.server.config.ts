import * as Sentry from "@sentry/nextjs";

process.env.NODE_ENV === "production" &&
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1,
    debug: false,
  });
