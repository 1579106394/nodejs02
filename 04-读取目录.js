var fs = require('fs')

fs.readdir('D:/www', (err, data)=>{
    console.log(data)
})