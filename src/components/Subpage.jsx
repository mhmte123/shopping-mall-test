import SectionTitle from './SectionTitle'
import SearchInput from './SearchInput'
import ProductList from './ProductList'

export default function Subpage({ title, category, bannerImg }) {
    return (
        <div>
            <div className="sub-banner">
                <img src={bannerImg} alt="" />
            </div>
            <div className="inner">
                <SectionTitle title={title} />
                <SearchInput />
                <ProductList category={category} />
            </div>
        </div>
    )
}
