import React, { Component, createRef, RefObject } from 'react'
import { Form, FormInstance, Input, Button, Space, message } from 'antd'
import '../static/css/login.css'
import { login } from '../api/login';
import { set } from '../utils/storage';

export default class Login extends Component {
    formRef: RefObject<FormInstance>

    constructor(props: any, context: any) {
        super(props, context)
        this.formRef = createRef<FormInstance>()
    }

    login = (form: any) => {
        login(form.username, form.password).then(response => {
            let data = response.data
            if (data.code === 0) {
                set("token", response.data.data)
                window.location.href = "/admin/dashboard"
                message.success("登录成功")
            } else {
                message.error("登录失败")
            }
        })
    }

    render() {
        return (
            <div className="login">
                <div className="form">
                    <Form className="login-form"
                        ref={this.formRef}
                        labelCol={{ span: 4 }}
                        onFinish={this.login}
                        style={{ 
                            width: '360px',
                            height: '100%',
                            margin: '54px auto'
                        }}>
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{
                                type: "string",
                                required: true,
                                message: "Please input your username!"
                            }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{
                                type: "string",
                                required: true,
                                message: "Please input your password!"
                            }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                                <Button type="primary" htmlType="reset">
                                    重置
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
