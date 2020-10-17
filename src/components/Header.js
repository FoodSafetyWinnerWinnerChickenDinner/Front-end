import React from 'react'
import '../styles/main.scss'

const Header = () => {
    return (
        <div className="header">
            <div className="header-content">
                <div className="header-date" s>
                    오늘 섭취량
                </div>
                <div className="header-data">
                    <div className="header-kcal">1,540kcal </div>
                    <div className="header-btn">자세히</div>
                </div>
                <div className="header-tag-wrap">
                    <div
                        className="header-tag-btn"
                        style={{ backgroundColor: '#54DB84' }}
                    >
                        양호
                    </div>
                </div>
                <div className="header-tag-wrap">
                    <div
                        className="header-tag-btn"
                        style={{ backgroundColor: '#00A2FF' }}
                    >
                        단백질 왕!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
