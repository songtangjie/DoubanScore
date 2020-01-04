// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    });
    wx.getStorage({
      key: options.title,
      success: (result) => {
        this.setData({
          movies: result.data
        })
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  back: function(evt) {
    console.log('back',evt.detail);
  },
  home: function(evt) {
    console.log('home',evt.detail);
  }
})