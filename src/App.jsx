import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd';
import "./asserts/base.less"
import { HomeOutlined, /* UserOutlined */ } from '@ant-design/icons';

import Header from './components/Header';
import Slider from './components/Slider';
import { connect } from 'react-redux';

// const { /* Sider, */ Content } = Layout;

function App(props) {

  const [content, setContent] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    switch (pathname) {
      case '/list':
        setContent("查看文章列表list")
        break
      case '/table':
        setContent("查看文章列表table")
        break
      case '/edit':
        setContent("文章编辑")
        break
      case '/means':
        setContent("修改资料")
        break
      default:
        setContent(pathname.includes('edit') ? "文章编辑":'')
        break
    }
  }, [pathname])

  return (
    <Layout id='app'>
      <Header avatarTag={props.avatarTag}/>
      <Layout className='container'>
        <Slider>Sider</Slider>
        <div className='container_box'>
          <Breadcrumb style={{
            height: '30px',
            lineHeight:'30px'
          }}>
            {/* 这个请求很慢 */}
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>
                {content}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
          
          <div className='container_content'>
            <Outlet />
          </div>
        </div>
      </Layout>
      <footer>Respect | Copyright &copy 2022 Author huangcj</footer>
    </Layout >

  )
}

const mapStateToProps=(state)=>{
  return {
    avatarTag:state.avatarTag
  }
}

export default connect(mapStateToProps)(App)