import React, { useState } from "react";
import DataTable from "../DataTable";
import Column from "../DataTable/column";
import "./style.scss";
import Dropdown from "../Dropdown";

export interface TestPageProps {}

const TestPage = ({}: TestPageProps): React.ReactElement => {
  const products = [
    {
      code: "P001",
      name: "Product 1",
      category: "Category A",
      quantity: 10,
      test: "name1",
    },
    {
      code: "P002",
      name: "Product 2",
      category: "Category B",
      quantity: 20,
      test: "name2",
    },
    {
      code: "P003",
      name: "Product 3",
      category: "Category A",
      quantity: 30,
      test: "name3",
    },
  ];
  const columns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
    { field: "test", header: "Test" },
  ];

  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);

  const countries = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];

  return (
    <div className="card">
      <div className="margin">
        <span className="margin">Table 1</span>
        <div className="margin-b">
          <DataTable products={products} columns={columns} />
        </div>
      </div>

      <div className="margin">
        <span>Table 2</span>
        <div className="margin-b">
          <DataTable products={products}>
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="test" header="Test"></Column>
          </DataTable>
        </div>
      </div>

      <div className="margin">
        <span className="margin">Table 3</span>
        <div className="margin-b">
          <DataTable products={products}>
            {columns.map((col) => (
              <Column key={col.field} field={col.field} header={col.header} />
            ))}
          </DataTable>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <h3>Dropdown with Search</h3>
        <Dropdown
          selectedCountry={selectedCountry1}
          onChange={setSelectedCountry1}
          options={countries}
          placeholder="Select a Country"
          isFilterEnabled={true} // Search enabled
        />

        <h3>Dropdown without Search</h3>
        <Dropdown
          selectedCountry={selectedCountry2}
          onChange={setSelectedCountry2}
          options={countries}
          placeholder="Select a Country"
          isFilterEnabled={false} // Search disabled
        />
      </div>
    </div>
  );
};

export default TestPage;
