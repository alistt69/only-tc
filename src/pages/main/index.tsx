import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Data } from "@/data";
import Date from "@/pages/main/components/date";
import Heading from "@/pages/main/components/heading";
import BlockCircleNavigation from "@/pages/main/components/block-circle-navigation";
import ContentContainer from "@/pages/main/components/content-container";
import classes from "./classes.module.scss";


const Main = () => {

    const [selectedBlockId, setSelectedBlockId] = useState<number>(Data[0].id);
    const selectedBlock = Data.find((block) => block.id === selectedBlockId) || Data[0];
    const [list, setList] = useState<number[]>([1, 2, 3, 4, 5, 6]);

    const getMinMaxDates = (objects: { date: number }[]) => {
        const dates = objects.map((obj) => obj.date);
        return {
            minDate: Math.min(...dates),
            maxDate: Math.max(...dates),
        };
    };

    const [minBlockDate, setMinBlockDate] = useState<number>(getMinMaxDates(Data[0].objects).minDate);
    const [maxBlockDate, setMaxBlockDate] = useState<number>(getMinMaxDates(Data[0].objects).maxDate);

    const shiftList = (shiftBy: number) => {
        const length = list.length;
        const normalizedShift = ((shiftBy % length) + length) % length;
        const shiftedList = [
            ...list.slice(length - normalizedShift),
            ...list.slice(0, length - normalizedShift),
        ];
        setList(shiftedList);
    };

    const handleBlockChange = (id: number) => {
        setSelectedBlockId(id);
    };

    useEffect(() => {
        if (Data.length > 0) {
            const { minDate, maxDate } = getMinMaxDates(Data[0].objects);
            setMinBlockDate(minDate);
            setMaxBlockDate(maxDate);
        }
    }, []);

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

    return (
        <div className={classes.container}>
            <Heading />
            <BlockCircleNavigation
                selectedBlockId={selectedBlockId}
                handleBlockChange={handleBlockChange}
                shiftList={shiftList}
                list={list}
            />
            <Date minBlockDate={minBlockDate}
                  maxBlockDate={maxBlockDate}
            />
            <ContentContainer selectedBlockId={selectedBlockId}
                              handleBlockChange={handleBlockChange}
                              selectedBlock={selectedBlock}
                              shiftList={shiftList}
            />
        </div>
    );
};

export default Main;
