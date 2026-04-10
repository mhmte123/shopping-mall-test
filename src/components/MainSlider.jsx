import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';

export default function MainSlider() {
    const slides = [
        { src: "./images/main_slider_01.jpg", alt: "slider1" },
        { src: "./images/main_slider_02.jpg", alt: "slider2" },
        { src: "./images/main_slider_03.jpg", alt: "slider3" },
        { src: "./images/main_slider_04.jpg", alt: "slider4" },
        { src: "./images/main_slider_05.jpg", alt: "slider5" }
    ]
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000
                }}
                loop={true}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <img src={slide.src} alt={slide.alt} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
