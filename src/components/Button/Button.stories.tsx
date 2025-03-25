import { Meta, StoryFn } from "@storybook/react";
import Button from "./index";
import { ButtonProps } from "./index"; // Explicitly import the type

export default {
  title: "Components/Button",
  component: Button,
} as Meta<typeof Button>;

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
