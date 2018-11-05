var http = require('http')

var fs = require('fs')

var template = require('art-template')

var server = http.createServer()

var wwwDir = 'D:/www'

server.on('request', (req, res) => {
  var url = + req.url

  fs.readFile('./tpl.html', (err, data) => {
    if (err) {
      return res.end('404 Not Found')
    }
    //   1.如何得到wwwDir目录列表中的文件名和目录名
    // 2.如何将得到的文件名和目录名替换到template.html中
    fs.readdir(wwwDir, (err, files) => {
      if (err) {
        return res.end('没有找到www目录')
      }

      // 第一个参数是原始数据，第二个是模板数据
      var htmlStr = template.render(data.toString(), {
        name: 'Jack',
        age: 18,
        hobbies: [
          '写代码',
          '唱歌',
          '打游戏'
        ],
        files: files
      })
      res.end(htmlStr)
    })
  })
})

server.listen(3000, () => {
  console.log('服务器启动成功')
})
