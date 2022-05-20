import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import './frame.css'
import { adminRoutes, IRouter } from '../../router';
import { Link } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Header, Content, Sider } = Layout;

export default class Frame extends Component {
    state = {
        flagURL: ["admin", "dashboard"]
    }

    /**
     * 动态生成菜单
     * @param routeList
     */
    generateMenu = (routeList?: IRouter[]) => {
        return (
            routeList?.map(r => {
                if (r.children) {
                    return (
                        <SubMenu key={r.key} title={r.title} icon={r.icon}>
                            {this.generateMenu(r.children)}
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={r.key} onClick={() => this.onChangeURL(r)} icon={r.icon}>
                            <Link to={r.key}>{r.title}</Link>
                        </Menu.Item>
                    )
                }
            })
        )
    }

    render() {
        return (
            <Layout>
                {/* 头 */}
                <Header className="header">
                    <div className="logo" style={{ color: 'white', fontSize: '45px' }}>
                        LOGO
                    </div>
                </Header>
                <Layout>
                    {/* 侧边栏菜单 */}
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}>
                            {this.generateMenu(adminRoutes)}
                        </Menu>
                    </Sider>
                    {/* 内容 */}
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                this.state.flagURL.map(flag => <Breadcrumb.Item key="flag">{flag}</Breadcrumb.Item>)
                            }
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
                {/* 底部 */}
                {/* <Footer style={{
                    background: '#001529',
                    color: 'white',
                    fontSize: '16px',
                    height: '48px',
                    textAlign: 'center',
                    padding: '14px'
                }}>©2021 - 2099 by Arctique</Footer> */}
            </Layout>
        )
    }

    // 获取路径
    onChangeURL(route: any) {
        let node = route.path.split('/')
        this.setState({ flagURL: node })
    }
}
