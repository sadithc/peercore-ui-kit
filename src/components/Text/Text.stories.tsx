import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Text from "./index"; 

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"], // Enables automatic documentation
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "default",
        "body1",
        "body2",
        "body3",
        "body4",
      ],
      description: "Choose the text variant",
    },
    textcase: {
      control: {
        type: "radio",
        options: ["none", "capitalize", "lowercase", "uppercase"],
      },
      description: "Text case Transformation",
    },
    decor: {
      control: {
        type: "radio",
        options: ["none", "underline", "strikethrough"],
      },
      description: "Text Decoration",
    },
    alignment: {
      control: {
        type: "radio",
        options: ["left", "center", "right", "justify"],
      },
      description: "Text Alignment",
    },
    inline: {
      control: "boolean",
      description: "Display text inline",
    },
    children: { control: "text" },
  },
  args: {}, 
} satisfies Meta<typeof Text>; 

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    variant: "default",
    textcase: "none",
    decor: "none",
    alignment: "left",
    children: "This is sample text",
  },
};

// All Variants story
export const AllVariants: Story = {
  args: {
    children: "Sample text",
  },
  render: () => (
    <>
      <Text variant="h1" decor="none">Heading 1</Text>
      <Text variant="h2" decor="underline">Heading 2</Text>
      <Text variant="h3" decor="strikethrough">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
      <Text variant="subtitle1">Subtitle 1</Text>
      <Text variant="subtitle2">Subtitle 2</Text>
      <Text>Body</Text>
      <Text variant="body1">Body 1</Text>
      <Text variant="body2">Body 2</Text>
      <Text variant="body3">Body 3</Text>
      <Text variant="body4">Body 4</Text>
    </>
  ),
};
