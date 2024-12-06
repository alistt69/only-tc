import React from "react";
import BlueForwardArrow from '@/pages/main/components/content-container/components/slider-navigation/assets/BlueForwardArrow.svg';
import classes from './classes.module.scss';

const SliderNavigation: React.FC<{ isBeginning: boolean, isEnd: boolean}> = ({ isBeginning, isEnd }) => {
    return (
        <>
            <button className={`${classes.backward_arrow} ${isBeginning && classes.disabled}`}>
                <BlueForwardArrow style={{transform: 'rotate(180deg)'}} />
            </button>
            <button className={`${classes.forward_arrow} ${isEnd && classes.disabled}`}>
                <BlueForwardArrow/>
            </button>
        </>
    );
};

export default SliderNavigation;