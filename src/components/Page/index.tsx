import React from "react";
import DataTable from "../DataTable";
import Column from "../DataTable/column";
import "./style.scss";

export interface TestPageProps {

}

const TestPage = ({ }: TestPageProps): React.ReactElement => {

    const products = [
        { code: "P001", name: "Product 1", category: "Category A", quantity: 10, test: "name1" },
        { code: "P002", name: "Product 2", category: "Category B", quantity: 20, test: "name2" },
        { code: "P003", name: "Product 3", category: "Category A", quantity: 30, test: "name3" },
    ]
    const columns = [
        { field: "code", header: "Code" },
        { field: "name", header: "Name" },
        { field: "category", header: "Category" },
        { field: "quantity", header: "Quantity" },
        { field: "test", header: "Test" },
    ]


    return (
        <div className="card">
            <div className="margin">
                <span className="margin">Table 1</span>
                <div className="margin-b">
                    <DataTable products={products} columns={columns} />
                </div>
            </div>

            <div className="margin">
                <span >Table 2</span>
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

        </div>
    );
};

export default TestPage;
