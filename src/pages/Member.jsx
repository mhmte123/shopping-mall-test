import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./scss/login.scss";
import { useAuthStore } from '../store/useAuthStore';

export default function Member() {
    const onMember = useAuthStore((s) => s.onMember);
    // 1. 상태변수
    const [formData, setFormData] = useState({
        uName: "",
        nickname: "",
        email: "",
        password: "",
        phone: "",
        profile: ""
    })
    // 2. 메서드 - 각각 입력한 input 요소를 name 속성으로 찾아서 값 변경시키기
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({ ...formData, [name]: value })
    };
    // 회원가입 전송
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onMember(formData);
    }
    // 3. 화면에 붙일 내용
    return (
        <div className="sub-page-wrap">
            <div className="inner">
                <div className="login-wrap">
                    <div className="section-title-box">
                        <h2 className="section-title">회원가입</h2>
                        <p className="section-sub-title">회원가입을 하시면 다양한 혜택이 제공됩니다</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="uName" placeholder="이름"
                            value={formData.uName}
                            onChange={handleChange} />
                        <input type="text" name="nickname" placeholder="닉네임"
                            onChange={handleChange} />
                        <input type="email" name="email" placeholder="이메일(필수)"
                            onChange={handleChange} />
                        <input type="password" name="password" placeholder="비밀번호"
                            onChange={handleChange} />
                        <input type="text" name="phone" placeholder="전화번호"
                            onChange={handleChange} />
                        <textarea name="profile" placeholder="자기소개"
                            onChange={handleChange}></textarea>
                        <input type="submit" name="회원가입" />
                    </form>
                    <p>이미 계정이 있으신가요?
                        <Link to="/login">로그인</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
