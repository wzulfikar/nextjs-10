let logger: any = {
  dev: (msg, opts = '') => console.info('[DEV]', msg, opts),
  debug: (msg, opts = '') => console.info('[DEBUG]', msg, opts),
  info: (msg, opts = '') => console.info('[INFO]', msg, opts),
  warn: (msg, opts = '') => console.warn('[WARN]', msg, opts),
  error: (msg, opts = '') => console.error('[ERROR]', msg, opts),
  fatal: (msg, opts = '') => console.error('[FATAL]', msg, opts),
};

// Override logger for production
if (process.env.NODE_ENV === 'production') {
  // logger.debug = () => {};
  // logger.info = () => {};
  // logger.warn = () => {};
  // logger.error = () => {};
  // logger.fatal = () => {};
}

export default logger;
