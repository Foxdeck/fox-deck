import {create} from '@storybook/theming/create';
import Logo from "./../src/storybook/storybook-logo.png";

export default create({
  base: 'dark',
  brandTitle: 'Foxdeck',
  brandImage: Logo,
  brandTarget: '_self',
});