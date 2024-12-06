import classes from "./classes.module.scss";
import React, { useState } from "react";
import Heading from "@/pages/main/components/heading";

const Main = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className={classes.container}>
            <Heading />
        </div>
    )
}

export default Main;
