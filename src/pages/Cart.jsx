import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'
import "./scss/cart.scss";

export default function Cart() {
    const { cartItems, totalPrice, onRemoveCart, onPlusCount, onMinusCount } = useProductStore();
    // 체크된 항목을 저장할 변수 구매하기에 넘겨줄 변수값
    const [checkedItems, setCheckedItems] = useState([]);
    // 체크박스를 체크했을 때 실행할 메서드
    const handleChecked = (item) => {
        console.log(item);
        const key = `${item.id}-${item.size}`
        setCheckedItems((prev) =>
            prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key])
    }
    console.log("cart내용:", cartItems);
    console.log("선택한 항목을 표시할 key:", checkedItems);

    // 전체 체크 메서드
    const handleAllChecked = (e) => {
        // 체크가 되면 모든 요소를 checkedItems에 담고, 체크가 해제되면 빈 배열로 만들기
        if (e.target.checked) {
            const allKeys = cartItems.map((item) => `${item.id}-${item.size}`);
            setCheckedItems(allKeys);
        }
        else {
            setCheckedItems([]);
        }
    }

    // 선택된 항목의 전체 정보를 저장할 변수
    const selectedItems = cartItems.filter((item) =>
        checkedItems.includes(`${item.id}-${item.size}`)
    )
    console.log("최종 체크된 요소", selectedItems);
    // 체크박스에 따른 가격 변동을 구할 변수
    // reduce 배열에 데이터를 합산을 구할때 사용
    // 배열명.reduce((누적값, 현재값) => 누적값 + 계산식값, 초기값)
    const selectedTotal = selectedItems.reduce((acc, cur) => acc + cur.price * cur.count, 0);
    console.log("선택된 항목의 총 가격", selectedTotal);

    return (
        <div className="sub-page-wrap">
            <div className="inner">
                <SectionTitle title="장바구니" />
                <div className="cart-wrap">
                    <div className="cart-title">
                        <div className="cart-goods-info">
                            <input type="checkbox"
                                checked={checkedItems.length === cartItems.length}
                                onChange={handleAllChecked}
                            />
                            상품정보</div>
                        <div className="cart-right">
                            <p>주문금액</p>
                            <p>수량</p>
                        </div>
                    </div>
                    <div className="cart-list-wrap">
                        <ul className="cart-list">
                            {cartItems.map((item) => (
                                // key 값 id, size를 이용하여 키 만들기
                                <li key={`${item.id}-${item.size}`}>
                                    <div className="cart-goods-info">
                                        <input type="checkbox"
                                            checked={checkedItems.includes(`${item.id}-${item.size}`)}
                                            onChange={() => handleChecked(item)}
                                        />
                                        <p><img src={item.image} alt={item.title} /></p>
                                        <div className="cart-info">
                                            <div className="title">{item.title}</div>
                                            <div className="cart-size">사이즈:{item.size}</div>
                                        </div>
                                    </div>
                                    <div className="cart-right">
                                        <div><p>{item.price}</p>
                                            <p>{item.price * item.count}</p></div>
                                        <div>
                                            <button onClick={() => onMinusCount(item.id, item.size)}>-</button>
                                            <span>{item.count}</span>
                                            <button onClick={() => onPlusCount(item.id, item.size)}>+</button>
                                            <button onClick={() => onRemoveCart(item.id, item.size)}>삭제</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="cart-bottom">
                        {/* <p>총금액 : {totalPrice}</p> */}
                        <p>총금액 : {selectedTotal}</p>
                        {/* 선택된 아이템, 선택된 아이템 합계를 결제로 넘기기 */}

                        {/* <Link to="/payment" sendData={{ 
                            sendData={selectedItems}
                            sendTotal= {selectedTotal} }}>모두 구매하기</Link> */}
                        <Link to="/payment" state={{ selectedItems, selectedTotal }}>모두 구매하기</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
