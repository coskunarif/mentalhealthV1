module.exports = {
  https: {
    onCall: () => () => {},
    onRequest: () => () => {},
    HttpsError: class HttpsError extends Error {
      constructor(code, message, details) {
        super(message);
        this.code = code;
        this.details = details;
      }
    },
  },
  config: () => ({}),
  pubsub: {
    schedule: () => ({
      onRun: () => () => {},
      timeZone: () => ({
        onRun: () => () => {},
      }),
    }),
  },
  firestore: {
    document: () => ({
      onCreate: () => () => {},
      onUpdate: () => () => {},
      onDelete: () => () => {},
    }),
    onWrite: () => () => {},
  },
  auth: {
    user: () => ({
      onCreate: () => () => {},
      onDelete: () => () => {},
    }),
  },
  // v2 namespace
  v2: {
    scheduler: {
      onSchedule: () => () => {},
    },
  },
};

export default {};
