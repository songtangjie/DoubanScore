//app.js
App({
  onLaunch: function () {
    wx.db = {};
    wx.db.url = (url) => {
      return `https://douban-api.uieee.com/${url}`;
    }
    this.initToast();

    //获取系统导航栏和状态栏高度
    const info = wx.getSystemInfoSync();
    wx.db.statusBarHeight = info.statusBarHeight;
    if (info.platform == 'android') {
      wx.db.navBarHeight = 48;
    } else {
      wx.db.navBarHeight = 44;
    }
  },

  initToast: function() {
    const ToastTypeNormal = 0;
    const ToastTypeSuccess = 1;
    const ToastTypeError = 2;
    let commonToast = (title, type, duration = 1500) => {
      let options = {
        title: title,
        icon: 'none',
        duration: duration
      };

      if (type == ToastTypeSuccess) {
        options.icon = 'success';
      } else if (type == ToastTypeError) {
        options.image = '/assets/imgs/upsdk_cancel_normal.png';
      }
      wx.showToast(options);
    };

    wx.db.toast = (title, duration) => {
      commonToast(title, ToastTypeNormal , duration);
    };
    wx.db.toastError = (title, duration) => {
      commonToast(title, ToastTypeError, duration);
    };
    wx.db.toastSuccess = (title, duration) => {
      commonToast(title, ToastTypeSuccess, duration);
    };
  },

  globalData: {
    userInfo: null
  }
})