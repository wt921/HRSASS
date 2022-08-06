import { asyncRoutes, constantRoutes } from '@/router';
export default {
    namespaced: true,
    state() {
        return {
            routes: constantRoutes//所有人默认有静态路由
        };
    },
    getters: {
        // 
    },
    mutations: {
        // 添加动态路由给所有路由
        setRoutes(state, newRoutes) {
            state.routes = [...constantRoutes, ...newRoutes];
        }
    },
    actions: {
        filterRoutes(context, data) {
            const userRoutes = [];
            // 通过权限菜单标识，筛选出该用户的动态路由
            asyncRoutes.forEach(item => {
                if (data.includes(item.name)) userRoutes.push(item);
            });
            context.commit('setRoutes', userRoutes);
            // 返回整理好的动态路由
            return userRoutes;
        }
    }
};