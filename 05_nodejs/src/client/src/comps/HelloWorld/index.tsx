import React from "react";

const HelloWorld: React.FunctionComponent = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        setTimeout(() => {
            fetch("/api")
                .then((res) => res.json())
                .then((data) => setData(data.message));
        }, 2000);
    }, []);

    return (
        <>
            <h1>Hello World</h1>

            <hr />

            <h3>Environmental variables:</h3>
            <p>
                process.env.PRODUCTION: <b>{process.env.PRODUCTION.toString()}</b>
            </p>
            <p>
                process.env.NAME: <b>{process.env.NAME}</b>
            </p>
            <p>
                process.env.VERSION: <b>{process.env.VERSION}</b>
            </p>
            <p>Server data: {!data ? "Loading..." : data}</p>
        </>
    );
};

export default HelloWorld;
