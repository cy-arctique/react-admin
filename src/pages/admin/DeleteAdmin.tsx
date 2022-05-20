import { Button, message, Popconfirm } from 'antd'
import React, { Component } from 'react'
import AdminApi from '../../api/admin'

interface IProps {
    id: number
    del: (id: number) => void
}

export default class DeleteAdmin extends Component<IProps> {

    // 根据id删除管理员信息
    delAdmin = () => {
        AdminApi.deleteAdmin(this.props.id).then((response) => {
            let {code, msg} = response.data
            if (code === 0) {
                message.success(msg)
                this.props.del(this.props.id)
            } else {
                message.error(msg)
            }
        })
    }

    // 取消删除
    cancel = () => {
        message.success("cancel delete")
    }

    render() {
        return (
            <Popconfirm onConfirm={this.delAdmin} title="delete" onCancel={this.cancel}>
                <Button type="primary" danger>delete</Button>
            </Popconfirm>
        )
    }
}
