import './PilgrimageListElement.css'
import { getStatus, getStatusClass } from 'src/common/StatusUtils.jsx'
import { getDate } from 'src/common/dateUtils'
export function PilgrimageListElement({name, status, date, place}) {
    

    return (
        <section className='pilgrimage-element-list'>
            <img className='pilgrimage-img-list' alt="imagen de ee" src="https://24ai.tech/es/wp-content/uploads/sites/5/2023/10/01_product_1_sdelat-kvadratnym-3-1.jpg" />
            <div className='pilgrimage-info-list'> 
                <div className='pilgrimage-title-list'>
                    <strong>{name}</strong>
                    <span className={`pilgrimage-status ${getStatusClass(status)}`}>{getStatus(status)}</span>
                </div>
                <div className='pilgrimage-subtitle-list'>
                    <span>{getDate(date)}</span>
                    <img className='emoji-img' alt="emoji" src="public\straw-hat-with-black-band-it_9493-64786-removebg-preview.png"/>
                    <span>{place}</span>
                </div>
            </div>
        </section>
    )
}

