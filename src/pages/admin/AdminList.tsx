import { Button, Space, Table } from 'antd'
import { Component } from 'react'
import AdminApi from '../../api/admin'
import AddAdmin from './AddAdmin'
import DeleteAdmin from './DeleteAdmin'

export interface IAdmin {
    id: number
    name: string
    mobile: string
    email: string
}

interface IState {
    loading: boolean,
    adminList: IAdmin[],
    current: number,
    hideOnSinglePage: boolean,
    size: number,
    total: number,
    showAddAdmin: boolean
}

export default class AdminList extends Component<any, IState> {
    constructor(props: any, context: any) {
        super(props, context)
        this.state = {
            loading: true,
            adminList: [],
            current: 1,
            hideOnSinglePage: true,
            size: 10,
            total: 0,
            showAddAdmin: false
        }
    }

    // 查询管理员列表
    getAdminList = (current: number = 1, size: number = 10) => {
        AdminApi.getAdminList(current, size).then(response => {
            let { records, current, size, total } = response.data.data
            this.setState({
                adminList: records,
                loading: false,
                current: current,
                size: size,
                total: total
            })
        })
    }

    componentDidMount() {
        this.getAdminList(this.state.current, this.state.size)
    }

    // 删除成功移除该行
    del = (id: number) => {
        // 删除完成，重新获取数据
        this.getAdminList(this.state.current, this.state.size)
    }

    // 修改页数
    change = (pagination: any) => {
        this.getAdminList(pagination.current, pagination.size)
        // 每次修改页数同步更新current和size
        this.setState({
            current: pagination.current,
            size: pagination.size
        })
    }

    // 显示添加管理员
    showAddAdmin = () => {
        this.setState({ showAddAdmin: !this.state.showAddAdmin })
    }

    // 隐藏添加管理员
    hiddenAddAdmin = (reflash?: boolean) => {
        if (reflash) {
            this.getAdminList()
        }
        this.setState({ showAddAdmin: !this.state.showAddAdmin })
    }

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showAddAdmin}>Add Admin</Button>
                <AddAdmin visible={this.state.showAddAdmin}
                    callback={this.hiddenAddAdmin} />
                <hr />
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.adminList}
                    rowKey={'id'}
                    pagination={{
                        position: ['bottomCenter'],
                        total: this.state.total,
                        pageSize: this.state.size,
                        showSizeChanger: false,
                    }}
                    onChange={this.change}>
                    <Table.Column title="id" dataIndex={'id'} />
                    <Table.Column title="name" dataIndex={'name'} ellipsis />
                    <Table.Column title="mobile" dataIndex={'mobile'} />
                    <Table.Column title="email" dataIndex={'email'} />
                    <Table.Column title="operate" render={(admin: IAdmin) => (
                        <Space>
                            <Button type="primary">edit</Button>
                            {/* 删除组件 */}
                            <DeleteAdmin id={admin.id} del={this.del} />
                        </Space>
                    )} />
                </Table>
            </>
        )
    }
}
