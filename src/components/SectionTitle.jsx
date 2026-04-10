import './scss/sectionTitle.scss'


export default function SectionTitle({ title, subTitle }) {
    return (
        <div className='section-title-box'>
            <h2 className="section-title">{title}</h2>
            <p className="section-sub-title">{subTitle}</p>
        </div>
    )
}
