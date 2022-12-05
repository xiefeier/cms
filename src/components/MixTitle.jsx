import React from 'react'
// import { Link } from 'react-router-dom'
export default function MixTitle(props) {
    return (
        <div>
            <a className='table_title' href={"http://codesohigh.com:8765/article/"
            +props.id} target='_blank'>{props.title}</a>
            <p style={{ color: "#999" }}>
                {props.subTitle}
            </p>
        </div>
    )
}
