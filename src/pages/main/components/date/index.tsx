import React from "react";
import classes from "./classes.module.scss";


const Date: React.FC<{minBlockDate: number, maxBlockDate: number}> = ({ minBlockDate, maxBlockDate }) => {
    return (
        <div className={classes.date_container}>
            <h1 className={classes.date_from}>{minBlockDate}</h1>
            <h1 className={classes.date_to}>{maxBlockDate}</h1>
        </div>
    );
};

export default Date;
