import React from 'react';
import { Meta, StoryFn } from "@storybook/react";
import TestPage,{ TestPageProps } from "./index";
 // Explicitly import the type

export default {
  title: "Components/Page",
  component: TestPage,
  argTypes: {
    products: { control: "object"},
    columns: {
      control: "object",
    },
  },
} as Meta;

// Define a Template
const Template: StoryFn<typeof TestPage> = (args: TestPageProps) => <TestPage {...args} />;

// Export stories with explicit types
export const DefaultPage: StoryFn<TestPageProps> = Template.bind({});



