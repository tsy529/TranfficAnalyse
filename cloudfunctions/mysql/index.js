// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      database: "neuvolunteer",
      user: "root",
      password: "admin"
    })
    const [rows, fields] = await connection.execute('SELECT version();')
    return rows;
  } catch (err) {
    console.log("链接错误", err)
    return err
  }
}