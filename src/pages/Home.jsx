import { useEffect } from 'react'
import SectionTitle from '../components/SectionTitle'
import MainSlider from '../components/MainSlider'
import { useProductStore } from '../store/useProductStore'
import SectionSwiper from '../components/SectionSwiper';

export default function Home() {
    const { onFetchItems } = useProductStore();
    // 컴포넌트가 화면에 붙을때 처음 한번 실행
    useEffect(() => {
        if (!onFetchItems.length) {
            onFetchItems();
        }
    }, [])
    return (
        <div className='container'>
            <MainSlider />
            <main>
                <section className='inner'>
                    <SectionTitle
                        title="SPRING PROMOTION"
                        subTitle="지금 필요한 봄 상품 할인 찬스" />
                    <SectionSwiper category="" count={4} />
                </section>
                <section className='inner'>
                    <div className="women-list">
                        <div className='women-left'><img src="./images/women-big.jpg" alt="" /></div>
                        <div className='women-right'>
                            <SectionTitle
                                title="전소미 PICK 신상 자켓"
                                subTitle="네 가지 컬러웨이로 만나보세요" />
                            <SectionSwiper category="women" count={2} />
                        </div>
                    </div>
                </section>
                <section className='inner'>
                    <SectionTitle
                        title="봄을 닮은 가벼운 실루엣"
                        subTitle="WOMEN SPRING JACKET" />
                    <SectionSwiper category="jewelery" count={5} />
                </section>
            </main>
        </div>
    )
}
