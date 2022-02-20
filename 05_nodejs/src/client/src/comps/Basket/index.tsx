import React from "react";
import Button from "react-bootstrap/esm/Button";

import "./Basket.css";

export interface IBasketViewProps {
    hideFun: Function,
    removeFromBasket: Function,
    buyProducts: Function,
    items: Array<{ name: string, id: number, available: boolean }>
};

const Basket: React.FC<IBasketViewProps> = (props) => {

    const checkout = () => {
        fetch("/api/buy", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tobuy: props.items })
        }).then(res => res.json())
            .then(res => {
                props.buyProducts(res);
            });
    };

    return (
        <div id="basketOverlay" onClick={() => props.hideFun()}>
            <div id="basketView" onClick={e => e.stopPropagation()}>
                <h2>Your basket</h2>
                <ul>
                    {
                        props.items.map(e =>
                            <li
                                key={e.id}
                                onClick={() => props.removeFromBasket(e)}
                                className={e.available ? "" : "prod-unav"}>
                                {e.name}
                            </li>
                        )
                    }
                </ul>
                <div id="listFooter">
                    <Button onClick={checkout}>
                        Buy
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Basket;
