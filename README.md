# 基于vite的后端集成实现方案

<p>
  技术栈 <a href="https://cn.vitejs.dev/">vite</a>,<a href="https://rollupjs.org/guide/en/">rollup</a>, <a href="https://yarnpkg.com/">Yarn</a>
</p>

## 开发

```bash
# 克隆dev分支至本地
git clone git@github.com:liamT1me/vite-backend-integration.git <your project>

# 进入文件夹
cd <your project>

# 安装依赖
cnpm install
# or
npm install
# or
yarn install

# 从dev检出分支
git checkout -b <new branch>

# 启动开发模式
npm run dev

默认启动方式为https  需要先手动打开链接 https://localhost:9527/@vite/client， 信任该链接，即可访问。

# 新建页面
npm run c <file name>

# css
scss中定义了两个全局变量 $c-path、$p-path
开发环境中指向：$c-path: 'https://localhost:9527/src/common', $p-path: 'https://localhost:9527/src/pages'

每个页面的入口文件 ``pages/**/index.js`` 建议只引入当前页面的index.scss, 因为rollup打包会找到入口文件的scss， assetFileNames方法里的参数暂时无法区分判断，可能会造成打包路径出错。
		
```

# html引入
在后端服务器对应的html页面中引入 ``<script type="module" src="https://localhost:9527/@vite/client"></script>``,以及引入对应的js文件（https://localhost:9527/src/pages/index/index.js）





## 测试



## 打包

