import { loginApi } from "@/api/user";
const state = {
  token: null
};
const mutations = {
  setToken() {

  },
  removeToken() { }

};
const action = {
  async login(context, data) {
    let res = await loginApi(data);
    console.log(res);
  }
};
export default {
  state,
  mutations,
  action
};