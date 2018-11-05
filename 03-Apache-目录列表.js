var http = require('http')

var fs = require('fs')

var server = http.createServer()

var wwwDir = 'D:/www'

server.on('request', (req, res) => {
  var url = req.url

  fs.readFile('./template.html', (err, data)=>{
      if(err)  {
          return res.end('404 Not Found')
      }
    //   1.如何得到wwwDir目录列表中的文件名和目录名
    // 2.如何将得到的文件名和目录名替换到template.html中
      res.end(data)
  })
  
})

server.listen(3000, () => {
  console.log('服务器启动成功')
})
