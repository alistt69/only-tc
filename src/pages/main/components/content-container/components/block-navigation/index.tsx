import React, { ReactNode } from "react";
import classes from "./classes.module.scss"

const BlockNavigation: React.FC<{ buttonContent: ReactNode, onClick: () => void, disable: boolean }> = ({ buttonContent, onClick, disable }) => {
    return (
        <button className={`${classes.nav_button} ${disable && classes.disable}`} onClick={!disable ? onClick : undefined}>
            {buttonContent}
        </button>
    )
}

export default BlockNavigation;
