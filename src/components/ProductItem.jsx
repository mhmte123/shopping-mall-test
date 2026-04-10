
export default function ProductItem({ sendItem }) {
    return (
        <div>
            <div className="img-box">
                <img src={sendItem.image} alt="" />
            </div>
            <div className="text-box">
                <h3>{sendItem.title}</h3>
                <div>
                    <strong>{sendItem.price}</strong>
                    <span>20%</span>
                </div>
            </div>
        </div>
    )
}
