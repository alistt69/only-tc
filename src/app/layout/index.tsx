import React, { ReactNode } from "react";
import classes from "./classes.module.scss";

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main className={classes.main_layout}>
            {children}
        </main>
    );
};

export default AppLayout;
