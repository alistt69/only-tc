import React, { ReactNode } from "react";
import classes from "./classes.module.scss";

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main className={classes.main_layout}>
            <div className={classes.date_container}>
                <h1 className={classes.date_from}>2015</h1>
                <h1 className={classes.date_to}>2022</h1>
            </div>
            {children}
        </main>
    );
};

export default AppLayout;
