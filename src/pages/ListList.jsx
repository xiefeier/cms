import {/*  Avatar, */ Button, List, Skeleton, Pagination, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ArticlesApi ,removeArticleApi} from '../request/api';
import { useNavigate } from 'react-router-dom';


export default function ListList() {

  const navigate = useNavigate()
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(0)
  const [pageSize, setPageSize] = useState(0)

  const [flash,setFlash] = useState(0) 
  useEffect(() => {
    getList(current, pageSize)

  }, [current,pageSize,flash])


  const getList = (current, pageSize) => {
    ArticlesApi({
      num: current,
      count: pageSize
    }).then(res => {
      // console.log(res)
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data

        setTotal(total)
        setList(arr)
        setCurrent(num)
        setPageSize(count)
      }
    })
  }
  const onChange = (page, pageSize) => {
    getList(page, pageSize)
  }




  return (
    <div className='list_table' style={{
      padding: '20px'
    }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
              <Button type='primary' onClick={() => navigate('/edit/'+item.id)}>编辑</Button>, 
              <Button type='primary' onClick={() => { 
                removeArticleApi({id:item.id}).then(res=>{
                  if(res.errCode===0){
                    message.success(res.message)
                    // 刷新页面
                    // 1 页面重载
                    // window.reload
                    // 2 重新请求数据
                    // getList(1)
                    // 3 设置一个变量监控
                    setFlash(flash+1)
                  }else{
                    message.error(res.message)
                  }
                })
              }} danger>删除</Button>
            ]}
            >
              <Skeleton
                title={false}
                loading={item.loading}
                active>
                <List.Item.Meta
                  title={<a href="/#">{item.title}</a>}
                  description={item.subTitle}
                />
                <div>{
                  moment(item.date).format('YYYY-MM-DD hh:mm:ss')
                }</div>
              </Skeleton>
            </List.Item>
          )
        }
        }
      />
      <Pagination
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
        style={{
          float: 'right',
          marginTop: '20px'
        }}
        onChange={onChange} />
    </div>
  )
}
