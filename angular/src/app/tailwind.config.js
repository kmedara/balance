import PrimeUI from 'tailwindcss-primeui';

export default {
     content: [
    "./src/**/*.{html,ts}",     // Angular templates
    "./node_modules/primeng/**/*.{js,ts}", // ensure classes aren’t purged
  ],
    plugins: [PrimeUI],
    corePlugins: {
      preflight: false
    },
}