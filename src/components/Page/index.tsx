import React, { useEffect, useState } from "react";
import DataTable from "../DataTable";
import Column from "../DataTable/column";
import "./style.scss";
import Dropdown from "../Dropdown";
import { imageBodyTemplate, inventoryStatusBodyTemplate, priceBodyTemplate, ratingBodyTemplate } from "../DataTable/ProductColumns";
import Button from "../Button";
import Modal from "../Modal";
import ModalHeader from "../Modal/Header";
import ModalBody from "../Modal/Body";
import ModalFooter from "../Modal/Footer";
// import ModalHeader from "../Modal/Header";
// import ModalBody from "../Modal/Body";
// import ModalFooter from "../Modal/Footer";
import Text from "../Text";

export interface TestPageProps { }

const TestPage = ({ }: TestPageProps): React.ReactElement => {

    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [selectedCountry2, setSelectedCountry2] = useState(null);

    const [sizeOptions] = useState<
        { label: string; value: "small" | "normal" | "large" }[]
    >([
        { label: "Small", value: "small" },
        { label: "Normal", value: "normal" },
        { label: "Large", value: "large" },
    ]);
    const [size, setSize] = useState(sizeOptions[1].value);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isOpen, setIslOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        //    console.log(isModalOpen)
    };

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async (sortField: string, sortOrder: number) => {
            try {
                const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=california&sort=${sortField}:${sortOrder === 1 ? 'asc' : 'desc'}&per_page`);
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



    const renderStars = (rating: number) => {
        const totalStars = 5;
        const stars = [];

        // Loop through the total stars (5 in this case)
        for (let i = 1; i <= totalStars; i++) {
            // If the current index is less than or equal to the rating, show a filled star (★)
            if (i <= rating) {
                stars.push(
                    <span className="star-filled" key={i}>
                        ★
                    </span>
                );
            } else {
                // If the current index is greater than the rating, show an empty star (☆)
                stars.push(
                    <span className="star-empty" key={i}>
                        ☆
                    </span>
                );
            }
        }

        return stars;
    };

    const columns = [
        { field: "code", header: "Code" },
        { field: "name", header: "Name" },
        { field: "category", header: "Category" },
        { field: "quantity", header: "Quantity" },
        { field: "test", header: "Test" },
        {
            field: "image",
            header: "Image",
            body: (product: any) => (
                <img
                    src={`https://example.com/images/${product.image}`}
                    alt={product.name}
                    className="w-6rem"
                />
            ),
        },
        {
            field: "price",
            header: "Price",
            body: (product: any) => `$${product.price.toFixed(2)}`,
        },
        {
            field: "rating",
            header: "Reviews",
            body: (product: any) => <div>{renderStars(product.rating)}</div>,
        },
        {
            field: "inventoryStatus",
            header: "Status",
            body: (product: any) => (
                <span className={`status ${product.inventoryStatus.toLowerCase()}`}>
                    {product.inventoryStatus}
                </span>
            ),
        },
    ];

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
    );

    const footer = `In total there are ${products ? products.length : 0
        } products.`;

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
                {/* Add Text component */}
                <Text variant="h1" decor="none" alignment="center">
                    Welcome to Test Page
                </Text>

                <Text variant="h4" decor="none" alignment="center" inline={true}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, <Text variant="body1" textcase="capitalize" decor="underline" alignment="justify" inline={true}>when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with
                        the release of Letraset</Text> sheets containing <Text variant="body1" decor="underline" alignment="right">Lorem Ipsum passages, and
                            more recently with desktop</Text> publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                </Text>

                <Text inline>Lorem Ipsum is simply dummy industry.<Text inline>Lorem Ipsum is simply dummy </Text><Text>Lorem Ipsum is simply dummy </Text></Text>

                <Text variant="h2" decor="underline" alignment="left">
                    Dropdown with Search
                </Text>
                <Dropdown
                    selectedCountry={selectedCountry1}
                    onChange={setSelectedCountry1}
                    options={countries}
                    placeholder="Select a Country"
                    isFilterEnabled={true} // Search enabled
                />

                <Text variant="h2" decor="underline" alignment="left">
                    Dropdown without Search
                </Text>
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
                    <span className="margin">
                        <Text variant="h2" decor="underline" alignment="left">
                            Basic Tabel
                        </Text>
                    </span>
                    <div className="margin-b">
                        <DataTable products={products} columns={columns} />
                    </div>
                </div>

                <div className="margin">
                    <Text variant="h2" decor="underline" alignment="left">
                        Dynamic Columns Table
                    </Text>
                    <div className="margin-b">
                        <DataTable products={products}>
                            {columns.map((col) => (
                                <Column
                                    key={col.field}
                                    field={col.field}
                                    header={col.header}
                                    body={col.body}
                                />
                            ))}
                        </DataTable>
                    </div>
                </div>

                <div>
                    <Button label="Modal Open"
                        // icon="icon-park-solid:correct"
                        iconPos="right" className=" button" onClick={handleOpenModal} />
                </div>


                <Modal isOpen={isModalOpen}>

                    <ModalHeader > <span>header</span></ModalHeader>

                    <ModalBody><span>
                        <div>
                            <h3>Product List</h3>
                            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit recusandae, veritatis ratione veniam aliquam perferendis molestiae provident ut incidunt officiis, cupiditate eveniet quas tempore quia modi deleniti aperiam sed nobis.</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nesciunt assumenda deleniti itaque quasi asperiores placeat incidunt! Nobis adipisci accusantium, praesentium iusto suscipit necessitatibus voluptates ut explicabo amet iure molestias?</span>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, neque, animi nobis aspernatur voluptas pariatur consectetur error earum vero at unde accusantium praesentium ab est. Id quidem quam a laudantium.</span>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quam vel reiciendis et illum accusamus pariatur magni ipsa voluptatum nostrum. Ea alias praesentium pariatur temporibus quia beatae sed saepe assumenda!</span>
                        </div>
                    </span></ModalBody>

                    <ModalFooter>
                        <div>
                            <button>Cancel</button>
                            <button>Confirm</button>
                        </div>
                    </ModalFooter>

                </Modal >
            </div>
        </>
    )
};
export default TestPage;
