import React, { useEffect, useState } from "react";
import DataTable from "../DataTable";
import Column from "../DataTable/column";
import "./style.scss";
import Dropdown from "../Dropdown";
import { imageBodyTemplate, inventoryStatusBodyTemplate, priceBodyTemplate, ratingBodyTemplate } from "../DataTable/ProductColumns";

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
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async (sortField: string, sortOrder: number) => {
            try {
                const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=california&sort=${sortField}:${sortOrder === 1 ? 'asc' : 'desc' }&per_page`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data); // Assuming the API returns an array of products
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching the products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts("name", 1); // Example arguments: "name" as sortField and 1 as sortOrder
    }, []);

    const columns = [
        { field: "id", header: "ID" },
        { field: "name", header: "Name" },
        { field: "city", header: "City" },
        { field: "country", header: "Country" },
        { field: "state", header: "State" },
        { field: "phone", header: "Phone" }
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
                    <span className="margin">Paginator Table 7</span>
                    <div className="margin-b">
                        <DataTable products={products} paginator rows={7} rowsPerPageOptions={[5, 10, 25, 50]}  >
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} />
                            ))}
                        </DataTable>
                    </div>
                </div>

                <div className="margin">
                    <span className="margin">Paginator Template Table 8</span>
                    <div className="margin-b">
                        <DataTable products={products} paginator rowsPerPageOptions={[5, 10, 25, 50]}
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} to {last} of {totalRecords}"
                            paginatorLeft={<button onClick={() => console.log("Custom Left Button")}>Left</button>}
                            paginatorRight={<button onClick={() => console.log("Custom Right Button")}>Right</button>}
                        >
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} sortable />
                            ))}
                        </DataTable>
                    </div>
                </div>

                <div className="margin">
                    <span className="margin">Sort Template Table 9</span>
                    <div className="margin-b"> 
                        
                        <DataTable products={products} paginator rowsPerPageOptions={[5, 10, 25, 50]}>
                            <Column field="id" header="ID" sortable />
                            <Column field="name" header="Name" sortable />
                            <Column field="city" header="City" sortable />
                            <Column field="country" header="Country" sortable />
                            <Column field="state" header="State" sortable />
                            <Column field="phone" header="Phone" sortable />
                        </DataTable>
                    </div>
                </div>


            </div>
        </>
    );
};

export default TestPage;
