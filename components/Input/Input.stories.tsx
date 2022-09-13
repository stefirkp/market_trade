import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from './Input';

export default {
  component: Input,
  title: 'Input',
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  const [inputValue, setInputValue] = React.useState<string>('');

  return <Input {...args} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'fullname',
  placeholder: 'Nama Lengkap',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  name: 'username',
  placeholder: 'Masukkan username anda',
  icon: <img src="https://www.svgrepo.com/show/5319/user.svg" width="20px" height="20px" />,
};
