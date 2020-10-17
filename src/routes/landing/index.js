import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '../../components/Button'
import { isEmpty } from '../../functions'

const Landing = () => {
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
        <div className="landing">
            <div className="landing-form">
                <div className="landing-title">
                    입력한 정보가 맞다면
                    <br />
                    아래 확인 버튼을 눌러주세요.
                </div>
                <div className="landing-input-half-form">
                    <div className="landing-input-title">나이</div>
                    <input
                        type="number"
                        onChange={(e) => setOld(e.target.value)}
                        className="landing-input"
                    />
                </div>
                <div className="landing-input-half-form">
                    <div className="landing-input-title">키</div>
                    <input
                        type="number"
                        onChange={(e) => setTall(e.target.value)}
                        className="landing-input"
                    />
                </div>
                <div className="landing-input-half-form">
                    <div className="landing-input-title">몸무게</div>
                    <input
                        type="number"
                        onChange={(e) => setFat(e.target.value)}
                        className="landing-input"
                    />
                </div>
                <div className="landing-input-half-form">
                    <div className="landing-input-title">성별</div>
                    {/* <input
                        onChange={(e) => setGender(e.target.value)}
                        className="landing-input"
                    /> */}
                    <select
                        className="landing-input"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">성별을 선택해주세요</option>
                        <option value="man">남자</option>
                        <option value="woman">여자</option>
                    </select>
                </div>
                {doRedirect && <Redirect to="/" />}
                <Button text="확인" full color func={onSubmit} />
            </div>
        </div>
    )
}

export default Landing
