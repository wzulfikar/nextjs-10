if (typeof window === 'undefined') {
  require('./server').default.listen();
} else {
  require('./browser').default.start();
}
