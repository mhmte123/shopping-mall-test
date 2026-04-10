import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, db, googleProvider } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useAuthStore = create((set, get) => ({
    // 1. 상태변수
    // 로그인, 회원가입
    user: null,

    // 2. 메서드
    // 회원가입
    onMember: async ({ uName, nickname, email, password, phone, profile }) => {
        try {
            // 이메일 회원가입
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            // Firestore에 저장하기
            // 1단계 - 저장 위치 지정
            // doc(db, "컬렉션", 문서)
            const userRef = doc(db, "users", user.uid);

            // 2단계 - 저장할 사용자 정보 만들기
            const userInfo = {
                uid: user.uid,
                name: uName,
                nickname,
                email,
                phone,
                profile
            }

            // 3단계 - firestore에 데이터 저장
            await setDoc(userRef, userInfo);

            // 4단계 - zustand에 상태 저장
            set({ user: userInfo })
            alert("회원가입 성공")
        }
        catch (err) {
            alert(err.message)
        }
    },
    // 이메일 로그인
    onLogin: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("로그인", userCredential);
            set({ user: userCredential.user })
        }
        catch (err) {
            alert(err.message)
        }
    },
    // 구글 로그인
    onGoogleLogin: async () => {
        try {
            console.log("구글 메서드 호출");
            // 구글 로그인 팝업을 띄워서 사용자로부터 로그인, 그 결과를 저장하기
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result);
            // 
            const user = result.user
            // 데이터베이스에 저장하기
            const userRef = doc(db, "users", user.uid);
            // 회원인지 아닌지 체크하기
            const userDoc = await getDoc(userRef);
            // 데이터가 없으면 회원가입이 안됨 있으면 회원가입 된 상태
            if (!userDoc.exists()) {
                const userInfo = {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    nickname: "",
                    phone: user.phoneNumber,
                    profile: ""
                }
                await setDoc(userRef, userInfo);
                set({ user: userInfo })
            } else {
                set({ user: userDoc.data() })
            }

        } catch (err) {
            alert(err.message);
        }
    },
    // 카카오 로그인
    onKakaoLogin: () => {

    },
    // 로그아웃
    onLogout: async () => {
        await signOut(auth);
        set({ user: null })
    }
}))