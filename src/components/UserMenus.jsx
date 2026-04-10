const userMenu = [
    "주문배송조회", "찜목록", "쿠폰함", "적립금", "회원정보수정", "회원탈퇴"
]

export default function UserMenus({ sendSelect }) {
    return (
        <div>
            <h2>마이페이지</h2>
            <ul>
                {userMenu.map((menu, id) => (
                    <li key={id}>
                        <button onClick={() => sendSelect(menu)}>{menu}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
