import { useState } from 'react'
import UserMenus from '../components/UserMenus'
import "./scss/userinfo.scss";
import OrderList from '../components/OrderList';
import WishList from '../components/WishList';
import CouponList from '../components/CouponList';
import UserEdit from '../components/UserEdit';
import { useLocation } from 'react-router-dom';

export default function UserInfo() {
    const location = useLocation();
    // 로그인 체크
    // 왼쪽 메뉴를 체크할 변수
    // const [selectMenu, setSelectMenu] = useState("주문배송조회");
    const [selectMenu, setSelectMenu] = useState(
        location.state?.menu || "주문배송조회"
    );
    // 왼쪽 메뉴를 클릭하면 메뉴 변경
    const handleMenuClick = ((menu) => {
        setSelectMenu(menu);
        console.log(menu);
    })
    // 오른쪽 보여줄 컴포넌트 체크하기
    const handleContent = () => {
        switch (selectMenu) {
            case "주문배송조회":
                return <OrderList />
            case "찜목록":
                return <WishList />
            case "쿠폰함":
                return <CouponList />
            case "적림금":
                return <p>적립</p>
            case "회원정보수정":
                return <UserEdit />
            case "회원탈톼":
                return <p>탈퇴</p>
        }
    }

    return (
        <div className="sub-page-wrap">
            <div className="inner user-info-wrap">
                <div className="user-info-left">
                    <UserMenus sendSelect={handleMenuClick} />
                </div>
                <div className="user-info-right">
                    <h2>{selectMenu}</h2>
                    <div>{handleContent()}</div>
                    <div className="user">
                        <p></p>
                        <p></p>
                        <button>로그아웃</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
