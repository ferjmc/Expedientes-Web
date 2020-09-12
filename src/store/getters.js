const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  organizaciones: state => state.organizaciones.organizaciones,
  organizacion: state => state.organizaciones.organizacion,
  optionsOrg: state => state.organizaciones.options,
  optionsUser: state => state.user.simpleList,
  oficinaid: state => state.user.oficinaid
  // optionsUser: state => () => {
  //  const optUser = [];
  //    state.user.simpleList.forEach(element => {
  //      optUser.push({
  //        label: element.username,
  //        key: element.id
  //      });
  //    });
  //  return optUser;
  // }
}
export default getters
