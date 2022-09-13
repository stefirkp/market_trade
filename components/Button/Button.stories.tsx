import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  children: 'Default Button',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button Primary',
  primary: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Button with Icon',
  icon: 'https://www.svgrepo.com/show/2825/add-symbol.svg',
  iconProps: {
    width: '10px',
    height: '10px',
  },
  onClick: () => console.log('Click button with icon'),
};
