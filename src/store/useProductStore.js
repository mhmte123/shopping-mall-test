import { create } from "zustand";
import { productsData } from "../data/productsData";
import { persist } from "zustand/middleware";

export const useProductStore = create(
    persist((set, get) => ({
        // ### 상품 변수, 메서드
        // 1. 변수
        // 상품목록을 저장할 배열
        items: [],
        // 메뉴를 저장할 변수
        menus: [],

        // 2. 메서드
        // 외부 데이터 불러오기
        onFetchItems: async () => {
            const existing = get().items;
            if (existing.length > 0) return;

            // 외부 데이터 저장할 변수
            const data = productsData;
            // console.log(data);
            // 메인메뉴 category
            // 배열에서 중복되는 데이터 제거하기
            // new Set ["상의","상의","하의","티","티"] => ["상의","하의","티"]
            const categories = ["all", ...new Set(data.map(item => item.category))];
            // console.log("cate : ", categories);

            // 메뉴+서브카테고리 생성
            // women, men, jewelery, electronics
            // menus = [
            //           { key: "all", label: "All", 
            //               sub: [
            //                      { key: "상의", label: "상의"},
            //                      { key: "하의", label: "하의"}
            //                    ]
            //           },
            //           { key: "women", label: "여자", sub: [] },
            //           { key: "man", label: "남자", sub: [] },    
            //          ]
            const menus = categories.map((cate) => {
                if (cate === "all") {
                    return { key: "all", label: "All", sub: [] }
                }
                // 
                const subCategories = [
                    ...new Set(data.filter(item => item.category === cate)
                        .map(subitem => subitem.subcategory))
                ]
                console.log("서브추출", subCategories)

                return {
                    key: cate,
                    label: cate === "men" ? "남자" :
                        cate === "women" ? "여자" :
                            cate === "jewelery" ? "보석" :
                                cate === "electronics" ? "전자제품" : cate,
                    sub: subCategories.map(sub => ({
                        key: sub,
                        label: sub
                    }))
                }
            })
            console.log("메뉴", menus);
            set({
                items: data,
                menus
            })
        },
        // 카테고리별로 상품을 분리해줄 메서드
        onItemsCategory: (cate) => {
            console.log("카테고리store!!!!!!!!!", cate);
            const allItems = get().items;
            if (!cate || cate === "all") { return allItems }
            else {
                return allItems.filter((item) => item.category === cate)
            }
        },

        // ### 장바구니
        // 장바구니에 담은 데이터 정보를 저장할 변수
        cartItems: [],
        // 카트에 담은 상품 개수
        cartCount: 0,
        // 상품의 전체 가격을 저장할 변수
        totalPrice: 0,

        // 전체 가격 구하기
        onTotal: (cart) => {
            // 배열의 데이터를 누적하여 계산하기
            // 배열명.reduce((누적값, 현재값) => 누적값 + 계산식값 초기값)
            // cartItems.reduce((acc,cur) => acc.cur.가격 * cur.개수, 0)
            return cart.reduce((acc, cur) => acc + cur.price * cur.count, 0)
        },

        // 메서드 담기, 제거, 개수 조절, 전체 장바구니 비우기
        // 상품을 카트에 담기
        onAddCart: (product) => {
            // 장바구니 정보 가져오기
            const cart = get().cartItems;
            // 같은 제품이 있는지 체크하기
            // 제품의 id 와 size가 일치하면 같은 제품, 둘중 하나라도 다르면 다른 제품
            const existing = cart.find((item) => item.id === product.id && item.size === product.size);


            const cartCount = get().cartCount;
            // 새롭게 담은 상품 장바구니에 추가
            let updateCart;
            // 같은 제품이 있는 경우와 없는 경우
            if (existing) {
                updateCart = cart.map((item) =>
                    item.id === product.id && item.size === product.size
                        ? { ...item, count: item.count + product.count }
                        : item
                )
            }
            else {
                updateCart = [...cart, { ...product }]
            }

            set({
                cartItems: updateCart,
                cartCount: updateCart.length,
                totalPrice: get().onTotal(updateCart)
            })
            console.log("장바구니:", cart);
        },
        // 담은 상품을 제거할 메서드
        onRemoveCart: (id, size) => {
            const updateCart = get().cartItems.filter(
                (item) => !(item.id === id && item.size === size))
            set({
                cartItems: updateCart,
                cartCount: updateCart.length,
                totalPrice: get().onTotal(updateCart)

            })
        },
        // 플러스 수량
        onPlusCount: (id, size) => {
            const updateCart = get().cartItems.map((item) =>
                item.id === id && item.size === size
                    ? { ...item, count: item.count + 1 }
                    : item
            )
            set({
                cartItems: updateCart,
                totalPrice: get().onTotal(updateCart)
            })
        },
        // 마이너스 수량
        onMinusCount: (id, size) => {
            const updateCart = get().cartItems.map((item) =>
                item.id === id && item.size === size
                    ? { ...item, count: Math.max(1, item.count - 1) }
                    : item
            )
            set({
                cartItems: updateCart,
                totalPrice: get().onTotal(updateCart)
            })
        },

        // ### 찜하기

        // ### 쿠폰
        coupons: [
            {
                id: "welcome",
                text: "웰컴 쿠폰 5% 할인",
                type: "percent",
                per: 5
            },
            {
                id: "cart",
                text: "장바구니 10% 할인",
                type: "percent",
                per: 10
            }
        ],
        finalPrice: 0,
        selectedCoupon: null,
        // 선택한 쿠폰이 뭔지 체크할 메서드
        onSelectedCoupon: (coupon) => {
            console.log(coupon)
            set({
                selectedCoupon: coupon
            })
        },
        // 최종 가격을 변경할 메서드
        onFinalPrice: (price) => {
            const { totalPrice, selectedCoupon } = get();
            let final;
            if (selectedCoupon) {
                final = Math.floor(price * (1 - selectedCoupon.per / 100))
            }
            else {
                final = price;
            }
            set({ finalPrice: final })
        },
        // ### 주문
        // 주문 목록을 저장할 변수
        orderLists: [],
        // 결제를 클릭하면 결제 항목이 주문목록에 들어가도록
        onAddOrder: (order) => {
            const orderPrev = get().orderLists;
            //     set({
            //         orderLists: [
            //             ...orderPrev,
            //             {
            //                 id: Date.now(), // 현 날짜를 포함한 시간정보
            //                 // new Date jsx 에서 사용불가 그래서 문자로 변환
            //                 date: new Date().toLocaleString(),
            //                 order
            //             }
            //         ]
            //     })
            // },
            const newOrder = {
                id: Date.now(),
                date: new Date().toLocaleString(),
                items: order.items,
                price: order.total,
                status: "결제완료"
            }
            const updateOrder = [...orderPrev, newOrder]
            set({
                orderLists: updateOrder,
                cartCount: 0,
                selectedCoupon: null,
                cartItems: []
            })
        },
        // ### 찜하기
        wishLists: [],
        onAddWishList: (product) => {
            const wish = get().wishLists;
            const existing = wish.find((w) => w.id === product.id)
            if (existing) {
                alert("이미 있는 제품입니다")
                return;
            }
            set({
                wishLists: [...wish, product]
            })
        },
        onRemoveWish: (id) => {
            const updateWish = get().wishLists.filter((w) => !(w.id === id))
            set({
                wishLists: updateWish
            })
        }

    }),
        {
            name: "product-storage",
            partialize: (state) => ({
                cartItems: state.cartItems,
                wishLists: state.wishLists,
                cartCount: state.cartCount,
                totalPrice: state.totalPrice,
                orderLists: state.orderLists
            })
        })
)