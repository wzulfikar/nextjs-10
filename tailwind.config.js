module.exports = {
  purge: [
    "./pages/**/*.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {},
  corePlugins: {
    // Disable tailwind preflight to prevent conflict with ant design base styles.
    // See: https://tailwindcss.com/docs/preflight#disabling-preflight
    preflight: false,
   }
};
