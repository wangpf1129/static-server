var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个人发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  response.statusCode = 200
  // 默认是index.html首页
  const filePath = path === '/' ? '/index.html' : path
  // 从后边开始获取 后缀 .
  const index = filePath.lastIndexOf('.')
  // 获取 后缀文件类型
  const suffix = filePath.substring(index)
  // 以哈希表的方式来 替换文件类型
  const fileTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'text/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
  }
  let content
  //  捕捉访问路径不存在的异常
  try {
    content = fs.readFileSync(`./public${filePath}`)
  } catch {
    content = '文件不存在'
    response.statusCode = 404
  }
  // 默认是 哈希表内的文件类型， 如果不存在就默认是 html 类型
  response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
  response.write(content)
  response.end()


  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)