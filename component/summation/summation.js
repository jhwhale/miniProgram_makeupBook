// component/summation/summation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ids:{
      type:Array,
      value:[],
      observer: function (newVal, oldVal) {

        var sum = 0
        var color = ''

        for (var i = 0; i < this.properties.ids.length; i++) {
          try {
            var value = wx.getStorageSync(this.properties.ids[i])
            var num = parseFloat(value.price)
            if (num.toString() == 'NaN') {
              num = 0
            }
            sum += num
          } catch (e) {
            wx.showToast({
              title: '!!!getStorageSync出问题啦!!!',
              icon: 'none',
            });
          }
        }

        if (sum <= 1000) {
          color = "#1b998b"
        } else if (sum > 1000 && sum <= 2000) {
          color = "#ff9b71"
        } else {
          color = "#e84855"
        }
        console.log(color)
        this.setData({
          summation: sum,
          sumColor: color
        }) 
      } 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    summation: 0,
    sumColor: '#1b998b'
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})