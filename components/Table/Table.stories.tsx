import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Table } from './Table';

export default {
  component: Table,
  title: 'Table',
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => {
  return <Table {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  tableFields: [
    { key: 'name', label: 'Nama' },
    { key: 'username', label: 'Username' },
    {
      key: 'bod',
      label: 'Birth of Date',
      customValue: ({ bod }) =>
        !bod ? (
          <span style={{ fontStyle: 'italic', fontWeight: 'initial', fontSize: '14px' }}>
            User belum mengisi bod
          </span>
        ) : (
          bod
        ),
    },
  ],
  data: [
    {
      name: 'Shafira Salsabila',
      username: 'tralala',
      bod: null,
    },
    {
      name: 'Kharima ocha',
      username: 'ocha_cute',
      bod: '2022-01-01',
    },
  ],
  className: 'user-list',
};
