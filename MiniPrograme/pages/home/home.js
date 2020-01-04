// pages/home/home.js
Page({
  data: {
    allMovies: [
      {
        title: '影院热映',
        url: 'v2/movie/in_theaters',
        movies: []
      },
      {
        title: '新片榜',
        url: 'v2/movie/new_movies',
        movies: []
      },
      {
        title: '口碑榜',
        url: 'v2/movie/weekly',
        movies: []
      },
      {
        title: '北美票房榜',
        url: 'v2/movie/us_box',
        movies: []
      },
      {
        title: 'Top250',
        url: 'v2/movie/top250',
        movies: []
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#42BD55'
    });
      

    this.loadLocalData();
    // this.loadCity((city) => {
    //   this.loadNewData(0, {city: city});
    // });
    
    // this.loadNewData(1);
    // this.loadNewData(2);
    // this.loadNewData(3);
    // this.loadNewData(4);
  },

    /**
   * 获取列表缓存数据
   */
  loadLocalData: function() {
    for (let index = 0; index < this.data.allMovies.length; index++) {
      const obj = this.data.allMovies[index];
      obj.movies = wx.getStorageSync(obj.title);
    }
    this.setData(this.data);
  },

  /**
   * 获取列表数据
   */
  loadNewData: function(idx, params) {
    wx.request({
      url: wx.db.url(this.data.allMovies[idx].url),
      data: params,
      header: {'content-type' : 'json'},
      success: (res) => {
        const movies = res.data.subjects;
        let obj = this.data.allMovies[idx];
        //清除缓存
        obj.movies = [];

        for (let index = 0; index < movies.length; index++) {
          let movie = movies[index].subject || movies[index];
          this.updateMovie(movie);
          obj.movies.push(movie);
        }
        this.setData(this.data);

        // 缓存数据
        wx.setStorage({
          key: obj.title,
          data: obj.movies,
        });
          
      },
      fail: () => {
        wx.db.toast(`获取${this.data.allMovies[idx].title}失败`);
      }
    })
  },

  /**
   * 获取城市名
   */
  loadCity: function(success) {
    // 获取经纬度
    wx.getLocation({
      success: (res) => {
        //请求百度api逆地理城市
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          data: {
            output: 'json',
            coordtype: 'wgs84ll',
            ak: 'sophFz2fRGRGQAQhxdvLndz2WdNPu3LN',
            location: `${res.latitude},${res.longitude}`
            // location: res.latitude + ',' + res.longitude
          },
          success: (res) => {
            // 拿到城市信息
            let city = res.data.result.addressComponent.city;
            city = city.substring(0, city.length - 1);
            success && success(city);
          },
          fail: () => {
            wx.db.toastError('获取城市失败');
          }
        })
      },

      fail: () => {
        wx.db.toastError('获取位置失败');
      }
    })
  },

  /**
   * 处理评分
   */
  updateMovie: function(movie) {
    let stars = parseInt(movie.rating.stars);
    if (stars == 0) return;
    movie.stars = {};
    movie.stars.on = parseInt(stars / 10);
    movie.stars.half = (stars - (movie.stars.on) * 10) > 0;
    movie.stars.off = parseInt((50 - stars) / 10);
  },

  /**
   * 点击更多
   */
  viewMore: function(evt) {
    const index = evt.currentTarget.dataset.index;
    const obj = this.data.allMovies[index];
    wx.navigateTo({
      url: `/pages/list/list?title=${obj.title}&url=${obj.url}`
    });
      
  }
})