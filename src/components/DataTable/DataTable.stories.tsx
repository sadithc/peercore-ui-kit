import { Meta, StoryFn } from "@storybook/react";
import DataTable from "./index";
import { DataTableProps } from "./index"; // Explicitly import the type

export default {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: {
    products: { control: "object"},
    columns: {
      control: "object",
    },
  },
} as Meta<typeof DataTable>;

// Define a Template
const Template: StoryFn<DataTableProps> = (args) => <DataTable {...args} />;

// Export stories with explicit types
export const DefaultTable: StoryFn<DataTableProps> = Template.bind({});