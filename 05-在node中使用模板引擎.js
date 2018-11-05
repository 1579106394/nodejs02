// art-template 不仅可以在浏览器使用，也可以在node中使用

// 安装：npm i art-template --save
// 该命令在哪执行就会把包下载到哪里。默认会下载到node_modules目录中
// node_modules目录不要改，也不支持改。

// 1.安装npm i art-template --save
// 2.在想要使用的文件模块加载art-template
// 3.看文档，使用模板引擎API
var fs = require('fs')
var template = require('art-template')

// 这里不是浏览器
// template('script 标签 id', {对象})

fs.readFile('./tpl.html', (err, data) => {

  if (err) {
    return console.log('读取失败')
  }

  // template.render('模板字符串', 替换对象)
  // data是二进制数据，而render需要接收的是字符串，所以需要把data转成字符串
  var ret = template.render(data.toString(), {
    name: '渣渣辉',
    age: 18,
    hobbies: [
      '写代码',
      '唱歌',
      '打游戏'
    ]
  })

  console.log(ret)
})
