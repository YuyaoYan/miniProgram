// pages/deployFunctions/deployFunctions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    showAddTagModel: false,
    fieldVal: '',
    tagList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: getApp().globalData.openid
    })
    console.log('getApp()',getApp());
    this.queryAllTags()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 添加标签
   */
  addTag() {
    this.setData({ showAddTagModel: true })
  },
  onChange(event) {
    console.log(event.detail);
    this.setData({ fieldVal: event.detail })
  },
  onClose() {
    console.log('onClose',this.data.fieldVal);


    const moment = require('../../utils/moment.min');

    const db = wx.cloud.database()
    db.collection('tags').add({
      data: {
        user: 'yyy',
        name: this.data.fieldVal,
        date: moment().format("YYYY-MM-DD")
      },
      success: res => {
        wx.showToast({
          title: '添加成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res)
        this.queryAllTags();
        this.setData({ fieldVal: '' });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  queryAllTags: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('tags').where({
      user: 'yyy'
    }).get({
      success: res => {
        this.setData({
          tagList: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
})