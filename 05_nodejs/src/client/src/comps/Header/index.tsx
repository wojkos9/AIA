import React from "react";
import Button from "react-bootstrap/Button";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

export interface IHeaderProps {
    toggleOverlay: Function
};

const Header: React.FunctionComponent<IHeaderProps> = (props) => {

    return (
        <div className="main-header">
            <span>
                ~ Shoppe ~
            </span>

            <Button variant="warning" id="basket-button" onClick={() => props.toggleOverlay()}>
                <FaShoppingCart />
            </Button>
        </div>
    );
};

export default Header;
