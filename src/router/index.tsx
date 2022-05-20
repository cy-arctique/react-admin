import { ReactElement, ReactNode } from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import User from "../pages/user/User";
import { DashboardOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import UserList from "../pages/user/UserList";
import AdminList from "../pages/admin/AdminList";

export interface IRouter {
    title: string
    path: string
    key: string
    icon?: ReactNode
    component?: ReactElement
    children?: IRouter[]
}

export const mainRoutes: IRouter[] = [
    {
        title: "",
        path: "/",
        key: "none",
        component: <Login />,
    },
    {
        title: "登录",
        path: "/login",
        key: "login",
        component: <Login />,
    },
    {
        title: "404",
        path: "*",
        key: "404",
        component: <PageNotFound />,
    },
]

export const adminRoutes: IRouter[] = [
    {
        title: "仪表盘",
        path: "/admin/dashboard",
        key: "dashboard",
        icon: <DashboardOutlined />,
        component: <Dashboard />,
    },
    {
        title: "管理员",
        path: "/admin/admin",
        key: "adminer",
        icon: <UserOutlined />,
        children: [
            {
                title: "管理员列表",
                path: "/admin/admin/admin-list",
                key: "admin-list",
                icon: <UsergroupAddOutlined />,
                component: <AdminList />
            }
        ]
    },
    {
        title: "用户管理",
        path: "/admin/user",
        key: "user",
        icon: <UserOutlined />,
        component: <User />,
        children: [
            {
                title: "用户列表",
                path: "/admin/user/user-list",
                key: "user-list",
                icon: <UsergroupAddOutlined />,
                component: <UserList />,
            },
        ]
    },
]