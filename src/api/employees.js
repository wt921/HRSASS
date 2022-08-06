import request from '@/utils/request';

/**
 *  获取员工的简单列表
 * **/
export function getEmployeeSimpleApi() {
    return request({
        url: '/sys/user/simple'
    });
}


// 获取员工列表
export const getEmployeeListApi = (params) => {
    return request({
        url: '/sys/user',
        method: "get",
        params
    });
};
// 获取员工详情
export const getEmployeeInfoApi = (id) => {
    return request({
        url: '/sys/user/' + id,
        method: "get"
    });
};
// 增加员工详情
export const addEmployeeApi = (data) => {
    return request({
        url: '/sys/user',
        method: "post",
        data
    });
};

// 修改员工详情
export const editEmployeeApi = (data) => {
    return request({
        url: '/sys/user/' + data.id,
        method: "put",
        data
    });
};

// 删除员工
export const delEmployeeApi = (id) => {
    return request({
        url: '/sys/user/' + id,
        method: "delete",

    });
};

// 导入员工

export const uploadEmployeeApi = (data) => {
    return request({
        url: '/sys/user/batch',
        method: "post",
        data
    });
};

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    });
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    });
}


/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
    return request({
        url: `/employees/${id}/jobs`
    });
}


/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    });
}
// 给员工分配角色
export function assignRoleApi(data) {
    return request({
        url: "/sys/user/assignRoles",
        method: 'put',
        data
    });
}