import request from '../utils/request'

export const login = (username: string, password: string): Promise<any> => {
    return request({
        url: "/admin/login",
        method: "post",
        data: {username, password}
    })
}