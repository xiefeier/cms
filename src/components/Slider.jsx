import React, { useEffect, useState } from 'react'
import { Layout } from 'antd';

import { ReadOutlined, DatabaseOutlined, EditOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { useNavigate,useLocation } from 'react-router-dom';

const { Sider, /* Content */ } = Layout;

export default function Slider() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey,setDefaultKey] = useState('')
    // 一般加个空数组是为了模仿componentDidMounted
    useEffect(()=>{
        const pathname = location.pathname
        setDefaultKey(pathname.split('/')[1])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location.pathname])



    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }

    const items = [
        getItem('查看文章列表list', 'list', <ReadOutlined />),
        getItem('查看文章列表table', 'table', <ReadOutlined />),
        getItem('文章编辑', 'edit', <EditOutlined />),
        getItem('修改资料', 'means', <DatabaseOutlined />)
      ];

    const onClick = (e) => {
        navigate('/'+e.key)
        setDefaultKey(e.key)
      };
    return (
        <Sider id='aside'>
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                className='menu'
                selectedKeys={[defaultKey]}
                mode="inline"
                theme='dark'
                items={items}
            />
        </Sider>
    )
}
