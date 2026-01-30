import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const DefaultPreset = definePreset(Aura, {
  components: {
    toolbar: {
      root: {
        background: '{surface.50}', // Light mode toolbar background
        color: '{text.color}',
      },
    },
  },
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: '#{zinc.0}',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
    },
  },
});
