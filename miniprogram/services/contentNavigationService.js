var contentNavigationService = {
  gooutDetail: "/pages/gooutDetail/gooutDetail",
  modeDetail: "/pages/modeDetail/modeDetail",
  currentDetail: "/pages/currentDetail/currentDetail",
  recommend: "/pages/recommend/recommend",

  // 导航参数
  navigationParameter: null,

  navigateToAsync: function (pageKey, parameter) {
    var navigationParameter = null;
    if (parameter != undefined) {
      navigationParameter = {
        pageKey: pageKey,
        parameter: parameter
      }
    }
    contentNavigationService.navigationParameter = navigationParameter;

    wx.navigateTo({
      url: pageKey,
    })
  },

  getParameter: function (pageKey) {
    if (contentNavigationService.navigationParameter == null || contentNavigationService.navigationParameter.pageKey != pageKey) {
      return null;
    } 

    var parameter = contentNavigationService.navigationParameter;
    contentNavigationService.navigationParameter = null;
    return parameter;
  }
};

module.exports = contentNavigationService;