// component/searchBar/searchBar.js
Component({

  /**
   * 组件的初始数据
   */
  data: {
    keyword: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getKeyword: function (e) {
      this.setData({
        keyword: e.detail.value
      })
    },
    search: function () {
      var keyword = this.data.keyword
      this.setData({//清空搜索输入框中的内容
        keyword:''
      })
      wx.navigateTo({
        url: '../searchResult/searchResult?keyword=' + keyword,
      })
    }
  }
})
