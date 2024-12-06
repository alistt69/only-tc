import classes from "./classes.module.scss";
import { Data } from "@/data";
import ActiveArrow from "./assets/ActiveArrow.svg";
import React, { LegacyRef, useEffect, useRef } from "react";
import { IDataBlock } from "@/data/model";
import BlockNavigation from "@/pages/main/components/content-container/components/block-navigation";
import SliderInformation from "@/pages/main/components/content-container/components/slider-information";
import { gsap } from "gsap";

interface ContentContainerProps {
    selectedBlockId: number,
    handleBlockChange: (id: number) => void,
    shiftList: (by: number) => void,
    selectedBlock: IDataBlock,
}

const ContentContainer: React.FC<ContentContainerProps> = ({ selectedBlockId, handleBlockChange, shiftList, selectedBlock }) => {

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
        }
    }, [selectedBlockId]);

    return (
        <div className={classes.info_container}>
            <span className={classes.pagination}>
                {(selectedBlockId + 1).toString().padStart(2, '0')}/{Data.length.toString().padStart(2, '0')}
            </span>

            <BlockNavigation buttonContent={<ActiveArrow/>}
                             disable={selectedBlockId === Data[0].id}
                             onClick={() => {
                                 handleBlockChange(selectedBlockId - 1);
                                 shiftList(1)}}
            />

            <BlockNavigation buttonContent={<ActiveArrow style={{transform: 'rotate(180deg)'}}/>}
                             disable={selectedBlockId === Data.length - 1}
                             onClick={() => {
                                 handleBlockChange(selectedBlockId + 1);
                                 shiftList(-1)}}
            />

            <SliderInformation selectedBlock={selectedBlock}
                               contentRef={contentRef}
            />

        </div>
    )
}

export default ContentContainer;