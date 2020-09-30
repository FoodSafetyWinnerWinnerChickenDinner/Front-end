import React from 'react'
import '../styles/main.scss'

const Header = () => {
    return (
        <div className="header">
            <span className="header-date" s>
                9월 30일(수)
            </span>
            <div>
                <span className="header-kcal">1,540</span>
                <span className="header-kcal-sub">kcal</span>
            </div>
        </div>
    )
}

export default Header
