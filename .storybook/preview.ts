import type { Preview } from '@storybook/react';
import '../src/tokens/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // Включаем все правила WCAG 2.1 AA
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    layout: 'centered',
  },
};

export default preview;
