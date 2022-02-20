import React from "react";
import Button from "react-bootstrap/Button";

export interface ITableItemProps {
    name: string,
    id: Number,
    action: Function
};

const TableItem: React.FC<ITableItemProps> = (props) => {
    return (
        <tr>
            <td>
                <Button variant="success" onClick={() => { props.action(props.id) }}>
                    +
                </Button>
                <a> </a>
                {props.name}
            </td>
        </tr>
    );
};

export default TableItem;
