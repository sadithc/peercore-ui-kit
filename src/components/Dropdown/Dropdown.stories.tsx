// src/components/Dropdown/dropdown.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DropdownFilter from './index'; // Import the component from index.tsx

export default {
  title: 'Components/DropdownFilter',
  component: DropdownFilter,
} as Meta;

const Template: StoryFn = (args) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
  ];

  return (
    <DropdownFilter
      {...args}
      selectedCountry={selectedCountry}
      onChange={(e) => setSelectedCountry(e)}
      options={countries}
      placeholder="Select a Country"
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
