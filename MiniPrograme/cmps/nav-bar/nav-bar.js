// cmps/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    titleColor: {
      type: String,
      value: '#000'
    },
    statusBarColor: {
      type: String,
      value: '#fff'
    },
    navBarColor: {
      type: String,
      value: '#fff'
    },
    back: {
      type: String,
      value: 'true'
    },
    home: {
      type: String,
      value: 'true'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarStyle: '',
    navBarStyle: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function() {
      wx.navigateBack();
      this.triggerEvent('backTap',{name:'aa'});
    },
    home: function() {
      wx.navigateBack({
        delta: 999
      });
      this.triggerEvent('home',{age:18});
    }
  },

  lifetimes: {
    attached: function() {

      const statusBarStyle = `
      height: ${wx.db.statusBarHeight}px;
      background-color: ${this.data.statusBarColor};
      `;
      const navBarStyle = `
      color: ${this.data.titleColor};
      height: ${wx.db.navBarHeight}px;
      background-color: ${this.data.navBarColor};
      `;
       this.setData({
        statusBarStyle,
        navBarStyle
       });
    }
  }
})
