import React from "react";
import Button from "react-bootstrap/Button";

import { BiErrorAlt } from "react-icons/bi";

import "./ErrorDialog.css";

export interface IErrorDialogProps {
    goBackFun: Function
};

const ErrorDialog: React.FC<IErrorDialogProps> = (props) => {

    return (
        <div id="asdf">
            <div id="errorBanner">
                <h3 id="header">
                    <BiErrorAlt color={"red"} />
                    <span>Some items were unavailable</span>
                </h3>
                <div id={"info"}>Please remove them from the basket before proceeding.</div>
                <div id="errorFooter">
                    <Button onClick={() => props.goBackFun()}>OK</Button>
                </div>

            </div>
        </div>
    );
}

export default ErrorDialog;