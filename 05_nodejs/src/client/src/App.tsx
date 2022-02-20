import React from "react";
import Header from "./comps/Header";
import HelloWorld from "./comps/HelloWorld";
import ProductsTable from "./comps/ProductsTable";
import Basket from "./comps/Basket/index";

import ErrorDialog from "./comps/ErrorDialog";
import { propTypes } from "react-bootstrap/esm/Image";

const App: React.FC = () => {

    const [showB, setShowB] = React.useState(false);

    const [showE, setShowE] = React.useState(false);

    const [basket, setBasket] = React.useState([]);

    const toggleOverlay = () => {
        setShowB(prev => !prev);
    }

    const [data, setData] = React.useState([
        { name: "nothing", id: 0 }
    ]);

    React.useEffect(
        () => {
            fetch("/api/products")
                .then(res => res.json())
                .then(data => setData(data.map(e => ({ ...e, available: 1 }))
                ));
        },
        []
    );

    const addToBasket = (id) => {
        setData(olddata =>
            olddata.filter(e => {
                if (e.id == id) {
                    setBasket(bask0 => {
                        const bask1 = bask0.concat([e]);
                        console.log(
                            bask1.map(e => e.name)
                                .join(" ")
                        );

                        return bask1;
                    });
                    return false;
                }

                return true;
            })
        )
    };

    const removeFromBasket = (e) => {
        setBasket(bask0 => {
            const bask1 = bask0.filter(
                e0 => e0.id != e.id
            )
            if (e.available)
                setData(olddata => olddata.concat([e]));

            console.log(
                bask1.map(e => e.name)
                    .join(" ")
            );

            return bask1;
        });

    };

    const processPurchaseResult = (res) => {

        if (res.success) {
            setBasket([]);
            window.location.reload();
        } else {
            const av = res.result.map(e => e.id);
            setBasket(
                old => {
                    const b = old.map(x => {
                        return (av.indexOf(x.id) != -1) ? x : { ...x, available: 0 }
                    });
                    return b;
                }
            );
            setShowE(true);
        }
    };

    return (
        <>
            <Header toggleOverlay={() => toggleOverlay()} />
            <ProductsTable addToBasket={addToBasket} data={data} />
            {
                showB ?
                    <Basket buyProducts={processPurchaseResult}
                        hideFun={() => toggleOverlay()}
                        removeFromBasket={removeFromBasket}
                        items={basket} />
                    : ""
            }
            {
                showE ?
                    <ErrorDialog goBackFun={() => setShowE(false)} />
                    : ""
            }
        </>
    )
        ;
};

export default App;
