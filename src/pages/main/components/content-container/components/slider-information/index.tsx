import classes from "./classes.module.scss";
import SliderNavigation from "@/pages/main/components/content-container/components/slider-navigation";
import React, { LegacyRef, useRef, useState } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import { IDataBlock } from "@/data/model";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const SliderInformation: React.FC<{ selectedBlock: IDataBlock, contentRef: LegacyRef<HTMLDivElement> | undefined }> = ({ selectedBlock, contentRef }) => {

    const [isBeginning, setIsBeginning] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const swiperRef = useRef<SwiperClass | null>(null);

    const handleSwiperInit = (swiper: SwiperClass): void => {
        swiperRef.current = swiper;
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleSlideChange = (): void => {
        if (swiperRef.current) {
            setIsBeginning(swiperRef.current.isBeginning);
            setIsEnd(swiperRef.current.isEnd);
        }
    };

    return (
        <div className={classes.slider_container} ref={contentRef}>
            <SliderNavigation isBeginning={isBeginning} isEnd={isEnd}/>
            {selectedBlock && (
                <Swiper
                    modules={[ Navigation, /*Pagination*/ ]}
                    slidesPerView={3}
                    spaceBetween={1}
                    onInit={handleSwiperInit}
                    onSlideChange={handleSlideChange}
                    navigation
                    //pagination={{clickable: true}}
                >
                    {selectedBlock.objects
                        .sort((a, b) => a.date - b.date)
                        .map((obj, index) => (
                            <SwiperSlide key={index}>
                                <li className={classes.information_card}>
                                    <strong className={classes.date}>{obj.date}</strong>
                                    <p className={classes.description}>{obj.description}</p>
                                </li>
                            </SwiperSlide>
                        ))}
                </Swiper>
            )}
        </div>
    );
};

export default SliderInformation;
