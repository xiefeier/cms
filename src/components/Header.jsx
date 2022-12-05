import React, { useEffect, useState } from 'react'
import logoImg from '../asserts/logo.png'
import defaultAvatar from '../asserts/defaultAvatar.jpg'
import { CaretDownOutlined, /* SmileOutlined */ } from '@ant-design/icons';
import { Dropdown, Menu, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
// import '../pages/less/Header.less'

export default function Header(props) {
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState('游客')
    const navigate = useNavigate()

    useEffect(()=>{
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')
        if(username1){
            setUsername(username1)
        }
        if(avatar1){
            setAvatar('http://47.93.114.103:6688/'+avatar1)
        }
    },[props.avatarTag])
    

    // 退出登录
    const logout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('editable')
        localStorage.removeItem('cms-token')
        localStorage.removeItem('avatar')
        localStorage.removeItem('player')
        message.success('退出成功,即将返回登录页')
        setTimeout(() => navigate('/login'), 1500)

    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    // onClick:,
                    label: (
                        // <a target="_blank" rel="noopener noreferrer" href="/edit">
                        //     修改资料
                        // </a>
                        <span>修改资料</span>
                    ),
                },
                {
                    type: 'divider',
                },
                {
                    key: '2',
                    onClick: logout,
                    label: (
                        // <a target="_blank" rel="noopener noreferrer" href="/login">
                        //     退出登录
                        // </a>
                        <span>退出登录</span>
                    ),
                    //   icon: <SmileOutlined />,
                    //   disabled: true,
                },

            ]}
        />
    );
    return (
        <header>
            <img src={logoImg} alt="" className='logo' />
            <div className="right">
                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link' href='/#' onClick={(e) => e.preventDefault()}>
                        <Space className='space'>
                            <img src={avatar}
                                className='avatar' alt="" />
                            <span>{username}</span>
                            <CaretDownOutlined />
                            {/* <DownOutlined /> */}
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}
