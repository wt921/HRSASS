import request from '@/utils/request';
// 获取角色列表
export const getRoleListApi = (params) => {
    return request({
        url: '/sys/role',
        method: "get",
        params
    });
};
// 获取角色详情
export const getRoleInfoApi = (id) => {
    return request({
        url: '/sys/role/' + id,
        method: "get"
    });
};
// 增加角色详情
export const addRoleApi = (data) => {
    return request({
        url: '/sys/role',
        method: "post",
        data
    });
};

// 修改角色详情
export const editRoleApi = (data) => {
    return request({
        url: '/sys/role/' + data.id,
        method: "put",
        data
    });
};

// 删除角色数据
export const delRoleApi = (id) => {
    return request({
        url: '/sys/role/' + id,
        method: "delete"
    });
};
// 获取企业详情
export const getCompanyInfoApi = (id) => {
    return request({
        url: '/company/' + id,
        method: "get"
    });
};