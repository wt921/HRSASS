const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto,

  username: state => state.user.userInfo.username,
  companyId: state => state.user.userInfo.companyId
};
export default getters;
