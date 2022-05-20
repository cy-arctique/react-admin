import { Button, Form, FormInstance, Input, message, Modal } from 'antd'
import { Component, createRef, RefObject } from 'react'
import AdminApi from '../../api/admin'
import { IAdmin } from './AdminList'

interface IProps {
    visible: boolean
    // 回调
    callback: (reflash?: boolean) => void
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
}

const tailLayout = {
    wrapperCol: { effect: 4, span: 16 }
}

export default class AddAdmin extends Component<IProps> {
    formRef: RefObject<FormInstance>

    constructor(props: IProps) {
        super(props)
        this.formRef = createRef<FormInstance>()
    }

    // 取消
    cancel = () => {
        this.props.callback()
    }

    // 添加
    addAdmin = (admin: IAdmin) => {
        admin.id = 0
        console.log(admin)
        AdminApi.addAdmin(admin).then(response => {
            let {code, msg} = response.data
            if (code === 0) {
                message.success(msg)
                // 重置表单数据
                this.formRef.current?.resetFields()
                // 并关闭弹窗
                this.props.callback(true)
            } else {
                message.error(msg)
            }
        })
    }

    render() {
        return (
            <Modal
                title='Add Admin'
                onCancel={this.cancel}
                footer={null}
                visible={this.props.visible}>
                <Form ref={this.formRef} {...layout} onFinish={this.addAdmin}>
                    <Form.Item name='name' label='用户名' rules={[
                        {
                            type: 'string',
                            required: true,
                            message: '用户名不能为空'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='mobile' label='电话' rules={[
                        {
                            type: 'string',
                            required: true,
                            message: '电话不能为空'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name='password' label='密码' rules={[
                        {
                            type: 'string',
                            required: true,
                            message: '密码不能为空'
                        }
                    ]}>
                        <Input.Password />
                    </Form.Item> */}
                    <Form.Item name='email' label='邮箱' rules={[
                        {
                            type: 'string',
                            message: '电话不能为空'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    

                    {/* 提交按钮 */}
                    <Form.Item {...tailLayout} >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        &nbsp;
                        <Button type="default" htmlType="reset">
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
