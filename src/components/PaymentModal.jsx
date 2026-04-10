import "./scss/paymentModal.scss";

export default function PaymentModal({ onClose, onConfirm }) {
    return (
        <div className='modal-bg'>
            <div className="modal">
                <h2>결제 수단 선택</h2>
                <p>원하는 결제 방법을 선택하세요</p>
                <form>
                    <label><input type="radio" name="method" />카드결제</label>
                    <label><input type="radio" name="method" />현금결제</label>
                    <label><input type="radio" name="method" />간편결제</label>
                    <div>
                        <button onClick={onClose}>취소</button>
                        <button type="button" onClick={onConfirm}>결제하기</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
