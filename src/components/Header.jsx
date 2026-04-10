import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './scss/Header.scss'
import { useAuthStore } from '../store/useAuthStore'
import { useProductStore } from '../store/useProductStore';

export default function Header() {
    // 1. 변수, 상태변수
    const { user, onLogout } = useAuthStore();
    const { menus, cartCount } = useProductStore();
    const navigate = useNavigate();
    // 스크롤 체크할 변수
    const [isScrolled, setIsScrolled] = useState(false);
    // 현재 위치를 체크하는 hook useLocation()
    const location = useLocation();
    // 
    const isHome = location.pathname === "/"

    // 윈도우에 스크롤 이벤트 줘서 스크롤 위치 체크하기
    useEffect(() => {
        // 현위치가 홈인지 아닌지
        if (!isHome) {
            setIsScrolled(true)
            return
        }

        const handleScroll = () => {
            // 스크롤의 위치가 80이상이면 isScrolled 값을 true로 변경하여
            setIsScrolled(window.scrollY > 80);
        }
        window.addEventListener("scroll", handleScroll)

        // 초기값 체크하기
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);

    }, [isHome])

    // 2. 메서드
    const handleLogout = () => {
        onLogout();
        navigate("/");
    }

    // 3. 화면에 뿌려질 내용
    return (
        <header className={isScrolled ? "active" : ""}>
            <div className="inner">
                <div className="header-left">
                    <h1 className="logo">
                        <Link to="/"><img src="./images/logo.svg" alt="logo" /></Link></h1>
                    <nav>
                        <ul className="main-menu">
                            {menus.map(menu => (
                                <li key={menu.key}>
                                    <Link to={`/${menu.key}`}>{menu.label}</Link>
                                    {/* 서브메뉴가 있는지 체크하여 있는 요소들만 li 만들기 */}
                                    {menu.sub?.length > 0 && (
                                        <ul className='sub-menu'>
                                            {menu.sub.map((s) => (
                                                <li key={s.key}>
                                                    <Link to={`/${menu.key}/${s.key}`}>{s.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <ul className="gnb-list">
                        {user ? (
                            <>
                                <li>
                                    <Link to="/userinfo">
                                        <img src="./images/loginMember.png" alt="" />
                                        <span>내정보</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>
                                        <img src="./images/loginJoin.png" alt="" />
                                        <span>LOGOUT</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">
                                        <img src="./images/loginMember.png" alt="" />
                                        <span>LOGIN</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/member">
                                        <img src="./images/loginJoin.png" alt="" />
                                        <span>JOIN</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="cart">
                            <Link to="/cart">
                                <img src="./images/cart.png" alt="" />
                                <span className='cart-num'>{cartCount}</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="search-wrap">
                        <input type="text" />
                        <i className="search-icon"><img src="./images/search.png" alt="" /></i>
                    </div>
                </div>
            </div>
        </header >
    )
}
