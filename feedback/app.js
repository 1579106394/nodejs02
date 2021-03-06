// app application 应用程序
// 把当前模块所有的依赖项都声明在文件模块最上面
// 为了让目录结构保持统一清晰，所以我们约定，把所有的html文件都放到views
// 我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都存放在public、static这些目录中

var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [
  {
    name: '张三',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张三1',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错',
    dateTime: '2015-10-16'
  }
]

http.createServer((req, res) => {
  // 使用url.parse方法将路径解析为一个方便操作的对象
  var parseObj = url.parse(req.url, true)

  var pathname = parseObj.pathname

  if (pathname === '/') {
    fs.readFile('./views/index.html', (err, data) => {
      if (err) {
        return res.end('404 not found')
      }
      var ret = template.render(data.toString(), {
        comments: comments
      })
      res.end(ret)
    })
  } else if (pathname.indexOf('/public/') === 0) {
    // /public/css/main.css
    // /public/js/main.js
    // /public/lib/jquery.js
    // 统一处理
    // 如果请求路径是以/public/开头的，则我认为你要获取public中的某个资源
    // 所以我就直接可以把请求路径当做文件路径来直接进行读取
    fs.readFile('.' + pathname, (err, data) => {
      if (err) {
        return res.end('404 Not Found')
      }
      res.end(data)
    })
  } else if (pathname === '/post') {
    fs.readFile('./views/post.html', (err, data) => {

      res.end(data)
    })
  } else if (pathname === '/pinglun') {
    // 这个时候无论 /pinglun后面是什么，我都不用担心了，因为pathname不包含问号之后的路径
    // res.end(JSON.stringify(parseObj.query))
    // 1.获取表单提交的数据
    // 2.生成日期到数据对象中，存储到数组中
    // 3.让用户重定向跳转到首页
    var comment = parseObj.query
    comment.dateTime = '2017-11-2 17:11:22'
    comments.unshift(comment)
    // 数据已经存出好了，让用户重新请求首页
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
    
  } else {
    fs.readFile('./views/404.html', (err, data) => {
      res.end(data)
    })
  }
}).listen(3000, () => {
  console.log('running....')
})
