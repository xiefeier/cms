import React, { useEffect, useState } from 'react'
import './less/Means.less'

import { Button, Form, Input, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { GetInfoApi, ChangeUserDataApi } from '../request/api';
import { connect } from 'react-redux';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // Byte  Kb Mb Tb
  const isLt2M = file.size / 1024  < 200;
  if (!isLt2M) {
    message.error('Image must smaller than 200MB!');
  }
  return isJpgOrPng && isLt2M;
};


 function Means(props) {
  // const [password,setPassWord] = useState('')
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    GetInfoApi().then(res => {
      if (res.errCode === 0) {
        // setXxx是异步的
        // setU_Name(res.data.username)
        // // setPassWord(res.data.password)
        // setAvatar(res.data.avatar)
        // 存到sessionStorage
        sessionStorage.setItem('username', res.data.username)
        sessionStorage.setItem('avatar', res.data.avatar)
      }
    })
  }, [])

  const onFinish = (values) => {
    console.log(values)
    // 对比sessionStorage
    // 如果表单的username有值，并且不等于初始化拿到的username
    if (values.username && values.username !== sessionStorage.getItem('username') && values.password.trim() !== '') {
      ChangeUserDataApi({
        username: values.username,
        password: values.password,
      }).then(res => {
        console.log(res)
        // 当修改成功后记得修改Header
      })
    } else {
      message.error('请检查输入')
    }
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    // 上传成功
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const res = info.file.response
      if (res.errCode === 0) {
        message.success(res.message)
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
          // 存头像
          localStorage.setItem("avatar",res.data.filePath)
          // 触发reduce
          props.addAvatarTag()
        });
      }else{
        setLoading(false);
        setImageUrl()
        message.error(res.message)
      }
    }
    if(info.file.status === 'error'){
      message.error(info.file.response)
      setLoading(false)
      setImageUrl();
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传头像
      </div>
    </div>
  );
  return (
    <div className="means">
      <Form
        name="basic"
        style={{
          width: '400px'
        }}
        initialValues={{
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名: "
          name="username"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="修 改 密 码: "
          name="password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{
            float: 'right'
          }}>
            修改
          </Button>
        </Form.Item>
      </Form>

      {/* 图片上传 */}
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        // 后端
        action={'/api/upload'}
        headers={{
          'cms-token':localStorage.getItem('cms-token')
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}

const mapDispatchToProps = (dispatch)=>{
  return{
    addAvatarTag(){
      const action = {
        type:'addAvatarTag'
      }
      dispatch(action)
    }
  }
}

export default connect(null,mapDispatchToProps)(Means)