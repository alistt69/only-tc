import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import classes from "./classes.module.scss";
import Heading from "@/pages/main/components/heading";
import { Data } from "@/data";

const Main = () => {
    const [selectedBlockId, setSelectedBlockId] = useState<number>(Data[0].id);
    const [minBlockDate, setMinBlockDate] = useState<number>(0);
    const [maxBlockDate, setMaxBlockDate] = useState<number>(0);

    const handleBlockChange = (id: number) => {
        setSelectedBlockId(id);
    };

    const selectedBlock = Data.find((block) => block.id === selectedBlockId);

    const getMinMaxDates = (objects: { date: number }[]) => {
        const dates = objects.map((obj) => obj.date);
        return {
            minDate: Math.min(...dates),
            maxDate: Math.max(...dates),
        };
    };

    useEffect(() => {
        if (selectedBlock) {
            const { minDate, maxDate } = getMinMaxDates(selectedBlock.objects);

            gsap.to({ value: minBlockDate }, {
                duration: .2,
                value: minDate,
                ease: "power2.inOut",
                onUpdate: function () {
                    setMinBlockDate(Math.round(this.targets()[0].value));
                },
                roundProps: "value",
            });

            gsap.to({ value: maxBlockDate }, {
                duration: .2,
                value: maxDate,
                ease: "power2.inOut",
                onUpdate: function () {
                    setMaxBlockDate(Math.round(this.targets()[0].value));
                },
                roundProps: "value",
            });
        }
    }, [selectedBlock, minBlockDate, maxBlockDate]);

    useEffect(() => {
        if (Data.length > 0) {
            const { minDate, maxDate } = getMinMaxDates(Data[0].objects);
            setMinBlockDate(minDate);
            setMaxBlockDate(maxDate);
        }
    }, []);

    return (
        <div className={classes.container}>
            <Heading />
            <div className={classes.date_container}>
                <h1 className={classes.date_from}>{minBlockDate}</h1>
                <h1 className={classes.date_to}>{maxBlockDate}</h1>
            </div>
            <div>
                <div>
                    {Data.map((block) => (
                        <button key={block.id} onClick={() => handleBlockChange(block.id)}>
                            {block.name}
                        </button>
                    ))}
                </div>
                <div>
                    {selectedBlock && (
                        <ul>
                            {selectedBlock.objects
                                .sort((a, b) => a.date - b.date)
                                .map((obj, index) => (
                                    <li key={index}>
                                        <strong>{obj.date}:</strong> {obj.description}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;