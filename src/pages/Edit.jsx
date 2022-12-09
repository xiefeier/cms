import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
// import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Button, /* Descriptions, */ PageHeader, Modal, /* Checkbox, */ Form, Input, message } from 'antd';
import moment from 'moment';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { AddArticleApi, getArticleByidApi, updateArticleApi } from '../request/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Edit() {
  const params = useParams()
  const navigate = useNavigate()
  // console.log(params)
  const [editor, setEditor] = useState(null)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  // 编辑器内容
  const [html, setHtml] = useState('')
  //弹出表单
  const [form] = Form.useForm();
  // 
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const submitarticle = (res) => {
    console.log(res)
      if (res.errCode === 0) {
        message.success(res.message)
        navigate('/list')
      } else {
        message.error(res.message)
      }
      setLoading(false);
      setOpen(false);
  }



  const showModal = () => {
    setOpen(true);
  };


  const handleOk = () => {
    // 文章修改
    if (params.id) {
      form.validateFields()
        .then((values) => {
          let { title, subTitle } = values


          // 设置按钮加载动画
          setLoading(true);
          // form.resetFields();
          // 做更新操作
          // 请求
          updateArticleApi({
            content: html,
            id: params.id,
            subTitle: subTitle,
            title: title
          }).then(res => submitarticle(res))
        })
        .catch(() => {
          setLoading(false);
          return
        });

      // 文章添加
    } else {
      // 获取表单中的值
      form.validateFields()
        .then((values) => {
          let { title, subTitle } = values
          setTitle(title)
          setSubTitle(subTitle)

          form.resetFields();
          // 设置按钮加载动画
          setLoading(true);
          // 做保存操作
          // 请求
          AddArticleApi({
            title: title,
            subTitle: subTitle,
            content: html
          }).then(res => submitarticle(res))

        })
        .catch(() => { return });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };


  // 模拟 ajax 请求，异步设置 html
  // 判断是否是文章页面进来的
  useEffect(() => {
    if (params.id) {
      getArticleByidApi({ id: params.id }).then(res => {
        setHtml(res.data.content)
        setTitle(res.data.title)
        setSubTitle(res.data.subTitle)
      })
    } else {
      setHtml('')
      setTitle('')
      setSubTitle('')
    }

  }, [params.id])

  // 工具栏配置
  // const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法
  const toolbarConfig = {}                        // JS 语法

  // 编辑器配置
  // const editorConfig: Partial<IEditorConfig> = {    // TS 语法
  const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
    /* scroll:true */
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {

    // 注：class写法需要在componetWillUnmount中调用
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div style={{
      background: '#fff'
    }}>
      {/* 页头 */}
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
        extra={
          <Button key="1" type="primary" onClick={showModal}>
            提交文章
          </Button>
        }
      >

      </PageHeader>

      {/* 富文本编辑器 */}
      <div style={{
        border: '1px solid #ccc',
        zIndex: 100,
        // padding: '20px',
        margin: '20px',
        background: '#fff'
      }
      }>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          // placeholder={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      

      <>
        {/* 弹窗 */}
        <Modal
          open={open}
          title="填写文章标题"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              返回
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              提交
            </Button>,
          ]}
        >

          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
            initialValues={{
              remember: true,
              title,
              subTitle
            }}
            autoComplete="off"
          >
            <Form.Item
              label="标题"
              name="title"
              // initialValue={title}
              placeholder={title}
              key='title'
              rules={[
                {
                  required: true,
                  message: '请输入标题!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="副标题"
              name="subTitle"
              // initialValue={subTitle}
              placeholder={subTitle}
              // value={subTitle}
              key='subTitle'
              rules={[
                {
                  required: false,
                  message: '请输入副标题!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>

        </Modal>
      </>
    </div>

  )
}
