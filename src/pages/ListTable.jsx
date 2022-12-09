import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './less/list_table.less'
import { Space, Table, /* Tag,  */Button } from 'antd';
import { useState } from 'react';
import { ArticlesApi,removeArticleApi } from '../request/api';
import MixTitle from '../components/MixTitle';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
// const data = [{
//     key: '1',
//     name: 'John Brown',
//     date: '2022-10-31 15:07:25',
// }]

export default function ListTable() {
    const [rows, setRows] = useState([])
    const [flash, setFlash] = useState(0)

    const navigate = useNavigate()
    // 分页
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5
    })

    // 封装请求
    const getArticleList = (cunrrent, pageSize) => {
        ArticlesApi({
            num: cunrrent,
            count: pageSize
        }).then(res => {
            let { num, count, total } = res.data
            setPagination({
                cunrrent: num,
                pageSize: count,
                total: total
            })
            // res.data.total
            // 深拷贝
            let newarr = JSON.parse(JSON.stringify(res.data.arr))
            let viewarticles = []
            newarr.map(item => {
                // item.date = moment(item.date).format('YYYY-MM-DD hh:mm:ss')
                // item.mixTitle = `<div>
                //     <Link className='table_title' to='/'>${item.title }</Link>
                //     <p style={{ color: "#999" }}>
                //     ${item.subTitle }
                //     </p>
                // </div>`

                // 组件化开发
                let obj = {
                    key: item.id,
                    date: moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
                    mixTitle: <MixTitle id={item.id} title={item.title} subTitle={item.subTitle}></MixTitle>
                }
                viewarticles.push(obj)
            })


            setRows(viewarticles)

        })
    }

    const onChange = (pagination) => {
        // console.log(pagination)
        getArticleList(pagination.current, pagination.pageSize)
    }
    useEffect(() => {
        // console.log(pagination)
        getArticleList(pagination.current, pagination.pageSize)
    }, [flash])

    const columns = [
        {
            dataIndex: 'mixTitle',
            key: 'mixTitle',
            width: '60%',
            render: (text) =>
                text
            // <>
            //     <Link className='table_title' to='/'>{ }</Link>
            //     <p style={{ color: "#999" }}>
            //         {text}
            //     </p>
            // </>
            ,
        },
        {
            dataIndex: 'date',
            key: 'date',
        },
        {
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Button type='primary' onClick={() => navigate('/edit/' + text.key)}>编辑</Button>
                        <Button type='primary' onClick={() => {
                            removeArticleApi({ id: text.key }).then(res => {
                                if (res.errCode === 0) {
                                    message.success(res.message)
                                    setFlash(flash + 1)
                                    // getArticleList(pagination.current, pagination.pageSize)
                                } else {
                                    message.error(res.message)
                                }
                            })
                        }} danger>删除</Button>
                    </Space>
                )
            },
        },
    ];

    return (
        <div className='list_table'>
            <Table pagination={pagination}
                showHeader={false}
                columns={columns}
                dataSource={rows}
                onChange={onChange}
            />
        </div>
    )
}



