import React from 'react'
import { isEmpty } from '../functions'

const Button = (props) => {
    const { text, full, color, func, left, right } = props
    return (
        <div
            style={{
                display: !full && 'inline-block',
                position: 'fixed',
                bottom: '20px',
                right: !isEmpty(right) && `${right}px`,
                left: !isEmpty(left) && `${left}px`,
                width: full ? '320px' : '156px',
                height: '57px',
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color ? '#306A60' : 'white',
                border: !color && '1px solid #306A60',
                color: color && 'white',
                fontSize: '17px',
                borderRadius: '7px',
            }}
            onClick={() => func()}
        >
            <span>{text}</span>
        </div>
    )
}

export default Button
