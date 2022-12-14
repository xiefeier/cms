import React from 'react'
import { Button, /* Checkbox, */ Form, Input, message } from 'antd';
import './less/Login.less'
import logoImg from "../asserts/logo.png"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterApi } from '../request/api';


export default function Register() {
  const navigator = useNavigate()

  const onFinish = (values) => {
    // console.log('Success:', values);
    RegisterApi({
      username: values.username,
      password: values.password,
    }).then(res => {
      console.log(res)
      // 提示
      if (res.errCode === 0) {
        message.success(res.message).then(() => {
          navigator('/login')
        })
      }
      else if (res.errCode === 1) {
        message.error(res.message)
      }

    })
  };
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };


  return (
    <div className="login">
      <div className='login_box'>
        <img src={logoImg} alt="" />
        <Form
          name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          // wrapperCol={{
          //   span: 16,
          // }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            // label="Username"
            name="username"

            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size='large' prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            // label="Password"
            name="password"

            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder="请再次输入密码" />
          </Form.Item>
          <Form.Item>
            <Link to="/login">已有账号？立即登录</Link>
          </Form.Item>
          <Form.Item
          // wrapperCol={{
          //   offset: 8,
          //   span: 16,
          // }}
          >
            <Button size='large' type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
