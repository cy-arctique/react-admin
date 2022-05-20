    import request from '../utils/request';

export default class AdminApi {
    // 查询管理员列表
    static getAdminList = (current: number, size: number) => {
        return request({
            url: '/admin/list',
            params: {current, size},
            method: 'GET',
        })
    }

    // 删除管理员
    static deleteAdmin = (id: number) => {
        return request({
            url: '/admin/delete',
            params: {"id": id},
            method: 'POST',
        })
    }

    // 添加管理员
    static addAdmin = (admin: any) => {
        return request({
            url: '/admin/addAdmin',
            method: 'POST',
            data: admin
        })
    }
}

