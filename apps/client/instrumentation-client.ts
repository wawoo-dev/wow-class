import * as Sentry from "@sentry/nextjs";

process.env.NODE_ENV === "production" &&
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: false,
  });

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
