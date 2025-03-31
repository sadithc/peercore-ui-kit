import { Meta, StoryFn } from "@storybook/react";
import Button from "./index";
import { ButtonProps } from "./index"; // Explicitly import the type
import { fn } from "@storybook/test";

export default {
  title: "Components/Button",
  component: Button,
} as Meta<typeof Button>;

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

// Define a Template
const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

// Export stories with explicit types
export const Primary: StoryFn<ButtonProps> = Template.bind({});
Primary.args = {
  label: "Primary Button",
  variant: "primary",
};

export const Secondary: StoryFn<ButtonProps> = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  variant: "secondary",
};
