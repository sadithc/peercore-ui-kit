import React, { useState } from "react";
import DataTable from "../DataTable";
import Column from "../DataTable/column";
import "./style.scss";
import Dropdown from "../Dropdown";

export interface TestPageProps { }

const TestPage = ({ }: TestPageProps): React.ReactElement => {
    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [selectedCountry2, setSelectedCountry2] = useState(null);

    const [sizeOptions] = useState<{ label: string; value: "small" | "normal" | "large" }[]>([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState(sizeOptions[1].value);

    const renderStars = (rating: number) => {
        const totalStars = 5;
        const stars = [];

        // Loop through the total stars (5 in this case)
        for (let i = 1; i <= totalStars; i++) {
            // If the current index is less than or equal to the rating, show a filled star (★)
            if (i <= rating) {
                stars.push(<span className="star-filled" key={i}>★</span>);
            } else {
                // If the current index is greater than the rating, show an empty star (☆)
                stars.push(<span className="star-empty" key={i}>☆</span>);
            }
        }

        return stars;
    };

    const products = [
        { code: "P001", name: "Product 1", category: "Category A", quantity: 10, test: "name1", image: "product1.jpg", price: 100, rating: 4, inventoryStatus: "INSTOCK" },
        { code: "P002", name: "Product 2", category: "Category B", quantity: 20, test: "name2", image: "product2.jpg", price: 150, rating: 3, inventoryStatus: "LOWSTOCK" },
        { code: "P003", name: "Product 3", category: "Category A", quantity: 30, test: "name3", image: "product3.jpg", price: 200, rating: 5, inventoryStatus: "OUTOFSTOCK" },
        { code: "P004", name: "Product 4", category: "Category C", quantity: 50, test: "name4", image: "product4.jpg", price: 120, rating: 3, inventoryStatus: "INSTOCK" },
        { code: "P005", name: "Product 5", category: "Category B", quantity: 15, test: "name5", image: "product5.jpg", price: 180, rating: 4, inventoryStatus: "INSTOCK" },
        { code: "P006", name: "Product 6", category: "Category A", quantity: 25, test: "name6", image: "product6.jpg", price: 210, rating: 2, inventoryStatus: "LOWSTOCK" },
        { code: "P007", name: "Product 7", category: "Category C", quantity: 40, test: "name7", image: "product7.jpg", price: 250, rating: 4, inventoryStatus: "INSTOCK" },
        { code: "P008", name: "Product 8", category: "Category A", quantity: 5, test: "name8", image: "product8.jpg", price: 75, rating: 3, inventoryStatus: "OUTOFSTOCK" },
        { code: "P009", name: "Product 9", category: "Category B", quantity: 12, test: "name9", image: "product9.jpg", price: 140, rating: 5, inventoryStatus: "INSTOCK" },
        { code: "P010", name: "Product 10", category: "Category C", quantity: 8, test: "name10", image: "product10.jpg", price: 90, rating: 4, inventoryStatus: "INSTOCK" },
        { code: "P011", name: "Product 11", category: "Category A", quantity: 30, test: "name11", image: "product11.jpg", price: 130, rating: 4, inventoryStatus: "INSTOCK" },
        { code: "P012", name: "Product 12", category: "Category B", quantity: 18, test: "name12", image: "product12.jpg", price: 160, rating: 2, inventoryStatus: "LOWSTOCK" },
        { code: "P013", name: "Product 13", category: "Category C", quantity: 35, test: "name13", image: "product13.jpg", price: 220, rating: 3, inventoryStatus: "INSTOCK" },
        { code: "P014", name: "Product 14", category: "Category A", quantity: 11, test: "name14", image: "product14.jpg", price: 130, rating: 4, inventoryStatus: "LOWSTOCK" },
        { code: "P015", name: "Product 15", category: "Category B", quantity: 24, test: "name15", image: "product15.jpg", price: 175, rating: 3, inventoryStatus: "INSTOCK" },
        { code: "P016", name: "Product 16", category: "Category A", quantity: 8, test: "name16", image: "product16.jpg", price: 100, rating: 2, inventoryStatus: "OUTOFSTOCK" },
        { code: "P017", name: "Product 17", category: "Category C", quantity: 50, test: "name17", image: "product17.jpg", price: 250, rating: 5, inventoryStatus: "INSTOCK" },
        { code: "P018", name: "Product 18", category: "Category B", quantity: 6, test: "name18", image: "product18.jpg", price: 120, rating: 4, inventoryStatus: "LOWSTOCK" },
        { code: "P019", name: "Product 19", category: "Category A", quantity: 15, test: "name19", image: "product19.jpg", price: 180, rating: 3, inventoryStatus: "INSTOCK" },
        { code: "P020", name: "Product 20", category: "Category C", quantity: 9, test: "name20", image: "product20.jpg", price: 220, rating: 5, inventoryStatus: "INSTOCK" },
        { code: "P021", name: "Product 21", category: "Category A", quantity: 17, test: "name21", image: "product21.jpg", price: 140, rating: 2, inventoryStatus: "OUTOFSTOCK" },
        { code: "P022", name: "Product 22", category: "Category B", quantity: 12, test: "name22", image: "product22.jpg", price: 160, rating: 4, inventoryStatus: "LOWSTOCK" },
        { code: "P023", name: "Product 23", category: "Category C", quantity: 14, test: "name23", image: "product23.jpg", price: 180, rating: 3, inventoryStatus: "INSTOCK" },
    ];

    const columns = [
        { field: "code", header: "Code" },
        { field: "name", header: "Name" },
        { field: "category", header: "Category" },
        { field: "quantity", header: "Quantity" },
        { field: "test", header: "Test" },
        { field: "image", header: "Image", body: (product: any) => <img src={`https://example.com/images/${product.image}`} alt={product.name} className="w-6rem" /> },
        { field: "price", header: "Price", body: (product: any) => `$${product.price.toFixed(2)}` },
        { field: "rating", header: "Reviews", body: (product: any) => <div>{renderStars(product.rating)}</div> },
        { field: "inventoryStatus", header: "Status", body: (product: any) => <span className={`status ${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span> },

    ]

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

    const header = (
        <div>
            <span>header</span>
            <button>refresh</button>
        </div>
    )

    const footer = `In total there are ${products ? products.length : 0} products.`;


    return (
        <>
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

            <div className="card">
                <div className="margin">
                    <span className="margin">Basic Table</span>
                    <div className="margin-b">
                        <DataTable products={products} columns={columns} />
                    </div>
                </div>

                <div className="margin">
                    <span >Dynamic Columns Table</span>
                    <div className="margin-b">
                        <DataTable products={products}>
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                            ))}
                        </DataTable>

                    </div>
                </div>

                <div className="margin">
                    <span className="margin">Template Table</span>
                    <div className="margin-b">
                        <DataTable products={products} header={header} footer={footer}>
                            <Column field="code" header="Code"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                            <Column field="test" header="Test"></Column>
                            <Column field="image" header="Image" body={(product: any) => <img src={`https://example.com/images/${product.image}`} alt={product.name} className="w-6rem" />} />
                            <Column field="price" header="Price" body={(product: any) => `$${product.price.toFixed(2)}`} />
                            <Column field="rating" header="Reviews" body={(product: any) => <div>{renderStars(product.rating)}</div>} />
                            <Column field="inventoryStatus" header="Status" body={(product: any) => <span className={`status ${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>} />
                        </DataTable>
                    </div>
                </div>

                <div className="margin">
                    <span className="margin"> Size Table</span>
                    <div>
                        <div className="flex justify-content-center mb-4">
                            <select value={size} onChange={(e) => setSize(e.target.value as "small" | "normal" | "large")}>
                                {sizeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="margin-b">
                        <DataTable products={products} size={size}>
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                            ))}
                        </DataTable>
                    </div>
                </div>

                <div className="margin">
                    <span className="margin">Grid Lines Table 5</span>
                    <div className="margin-b">
                        <DataTable products={products} header={header} footer={footer} showGridlines >
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                            ))}
                        </DataTable>
                    </div>
                </div>

                <div className="margin">
                    <span className="margin">Striped Rows Table 6</span>
                    <div className="margin-b">
                        <DataTable products={products} header={header} footer={footer} stripedRows >
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                            ))}
                        </DataTable>
                    </div>
                </div>

                <div className="margin">
                    <span className="margin">Paginator Table 7</span>
                    <div className="margin-b">
                        <DataTable products={products} paginator rowsPerPageOptions={[5, 10, 25, 50]}  >
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                            ))}
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestPage;
