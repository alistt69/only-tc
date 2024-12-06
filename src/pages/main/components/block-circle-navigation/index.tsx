import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import classes from "./classes.module.scss";
import { Data } from "@/data";


const BlockCircleNavigation: React.FC<{ selectedBlockId: number, handleBlockChange: (id: number) => void, list: number[], shiftList: (by: number) => void }> = ({ selectedBlockId, handleBlockChange, list, shiftList }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    console.log(hoveredIndex);
    useEffect(() => {
        const angle = (360 / Data.length) * (selectedBlockId + 1);
        gsap.to(`.${classes.rotating_circle}`, {
            rotation: -angle,
            duration: 1,
            ease: "power2.out",
        });
    }, [selectedBlockId]);


    return (
        <nav className={classes.nav_circle}>
            <div className={classes.numbers_circle}>
                {list.map((item, index) => {
                    const angle = (360 / list.length) * (index - 1);
                    const radius = 265;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);
                    const getClassName = () => {
                        if (item - 1 === selectedBlockId) {
                            return classes.active_number;
                        } else if (hoveredIndex === item - 1) {
                            return classes.hovered_number;
                        } else {
                            return classes.inactive_number;
                        }
                    };

                    return (
                        <div
                            key={item}
                            style={{
                                transform: `translate(${x}px, ${y}px)`,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                            }}
                            className={getClassName()}
                        >
                            {item}
                            <h4 className={classes.block_name}>{Data[item - 1].name}</h4>
                        </div>
                    );
                })}
            </div>
            <div className={classes.rotating_circle}>
                {Data.map((block, index) => (
                    <div
                        className={classes.button_wrap}
                        style={{
                            transform: `rotate(${(360 / Data.length) * index}deg) translate(265px)`,
                        }}
                        key={block.id}
                        onClick={() => {
                            handleBlockChange(block.id);
                            shiftList(selectedBlockId - block.id);
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <button
                            className={`${classes.nav_button} ${
                                selectedBlockId === block.id ? classes.active : ""
                            }`}
                        >
                        </button>
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default BlockCircleNavigation;