import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TableItem from "./TableItem";

export interface IProductsTableProps {
    addToBasket: Function,
    data: Array<{ name: string, id: number }>
};

const ProductsTable: React.FC<IProductsTableProps> = (props) => {

    return (
        <>
            <div style={{ height: "60px" }}>

                <Button
                    onClick={() => {
                        fetch("/api/reset");
                        window.location.reload();
                    }}>
                    Reset
            </Button>
            </div>
            <Table>
                <tbody>
                    {
                        props.data.map(e =>
                            <TableItem
                                key={e.id}
                                name={e.name}
                                id={e.id}
                                action={props.addToBasket}
                            />
                        )
                    }
                </tbody>

            </Table>
        </>
    );
}

export default ProductsTable;
