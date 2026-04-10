import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import ProductItem from './ProductItem';
import { Link, useParams } from 'react-router-dom';
import "./scss/ProductList.scss";
import SectionTitle from './SectionTitle';

export default function ProductList({ category }) {
    // 주소줄에 있는 파라메터 값 받아서 사용하기
    const params = useParams();
    const paraCate = params.category || category;
    const subCategory = params.subcategory;

    console.log("카테고리", paraCate, subCategory);

    const { items, onFetchItems, onItemsCategory } = useProductStore();
    // 컴포넌트가 렌더링될때 items에 데이터가 있는지 체크하고 없으면 불러오기
    useEffect(() => {
        if (items.length === 0) onFetchItems();
    }, [items])

    // 카테고리별 필터링
    // let cateItems = onItemsCategory(category);
    let cateItems = items.filter((item) => {
        // 1. 메인 메뉴 카테고리 필터
        if (paraCate && paraCate !== "all" && item.category !== paraCate) {
            return false;
        }
        // 2. subcategory 가 있을 경우 필터
        if (subCategory && item.subcategory !== subCategory) {
            return false;
        }
        return true
    })
    // if (!items.length) return <div>로딩중...</div>
    console.log(category, "카테고리별:프로덕트리스트", cateItems);

    return (
        <div className='sub-page-wrap inner'>
            <SectionTitle title={subCategory} />
            <ul className="sub-goods-list">
                {cateItems.map((item) => (
                    <li key={item.id}>
                        <Link to={`/product/${item.id}`}><ProductItem sendItem={item} /></Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
