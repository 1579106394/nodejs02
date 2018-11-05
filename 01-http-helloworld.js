var http = require('http')

var fs = require('fs')

var server = http.createServer()

var wwwDir = 'D:/www'

server.on('request', (req, res) => {
  var url = req.url
  if (url === '/') {
    res.end('hello world')
  } else if (url === '/a.txt') {
    fs.readFile(wwwDir + '/a.txt', (err, data) => {
      if (err) {
        res.end('文件不存在')
      }else {
        res.setHeader('Content-Type', 'text/plain;charset=UTF-8')
        res.end(data)
      }
    })
  } else {
    res.end('404 Not Found.')
  }
})

server.listen(3000, () => {
  console.log('服务器启动成功')
})
