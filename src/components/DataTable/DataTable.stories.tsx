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
// DefaultTable.args = {
//   products: [
//     { code: "P001", name: "Product 1", category: "Category A", quantity: 10, test: "name1" },
//     { code: "P002", name: "Product 2", category: "Category B", quantity: 20, test: "name2" },
//     { code: "P003", name: "Product 3", category: "Category A", quantity: 30, test: "name3" },
//   ],
//   columns: [
//     { field: "code", header: "Code" },
//     { field: "name", header: "Name" },
//     { field: "category", header: "Category" },
//     { field: "quantity", header: "Quantity" },
//     { field: "test", header: "Test" },
//   ],
// };

