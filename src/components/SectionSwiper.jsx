import { Navigation, Scrollbar } from 'swiper/modules'
import { useProductStore } from '../store/useProductStore'
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

export default function SectionSwiper({ category, count, direction, delay }) {
    const { items, onItemsCategory } = useProductStore();
    const cateItems = onItemsCategory(category);
    console.log(category, cateItems);

    // 
    if (!items.length) return <div>로딩중...</div>;
    console.log("카테고리 섹션", category, cateItems);

    return (
        <div className="home-goods-list">
            <Swiper
                modules={[Navigation, Scrollbar]}
                spaceBetween={40}
                slidesPerView={count}
                loop={true}
                autoplay={{
                    delay: delay ? delay : 3000
                }}
                direction={direction ? direction : "horizontal"}
            >
                {cateItems.map((cate, id) => (
                    <SwiperSlide>
                        <Link to={`/product/${cate.id}`}>
                            <ProductItem sendItem={cate} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
