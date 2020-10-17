import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '../../components/Button'
import { isEmpty } from '../../functions'

const Anaylize = () => {
    const [old, setOld] = useState()
    const [fat, setFat] = useState()
    const [tall, setTall] = useState()
    const [gender, setGender] = useState()
    const [error, setError] = useState('')
    const [doRedirect, setDoRedirect] = useState(false)
    const onSubmit = () => {
        if (
            !isEmpty(old) &&
            !isEmpty(fat) &&
            !isEmpty(tall) &&
            !isEmpty(gender)
        ) {
            localStorage.setItem(
                'userInfo',
                JSON.stringify({
                    old,
                    fat,
                    tall,
                    gender,
                })
            )
            setDoRedirect(true)
            return
        } else {
            setError('모두 채워주세요.')
            return
        }
    }
    return (
        <div className="anaylize">
            {doRedirect && <Redirect to="/" />}
            <div
                className="anaylize-back-btn"
                onClick={() => setDoRedirect(true)}
            >
                <img
                    className="anaylize-back-btn-img"
                    src="/arrow-back.png"
                    alt="back btn"
                />
            </div>
            <div className="anaylize-title">
                류동훈 님의
                <br />
                금일 영양 분석 결과입니다.
            </div>
            <div className="anaylize-nut">
                <span className="anaylize-nut-title">영양소</span>
            </div>
            <div className="anaylize-recommend">
                <span className="anaylize-recommend-title">추천음식</span>
            </div>
            <div style={{ width: '320px', margin: '0 auto' }}>
                <Button text="확인" full color />
            </div>
        </div>
    )
}

export default Anaylize
