# 功能: 在网页编辑代码,并传送至多个手机,运行autojs脚本
# 缘由: 目的,不想手动一个一个手机复制脚本,太累.
# 实现: nodejs + pm2
# 服务器: 阿里云ECS
#使用步骤
0. 自行百度安装nodejs.
1. 下载代码  `git clone git@github.com:snailuncle/jsTree.git`
2. 复制文件夹名字为**这里面的都放到autojs脚本目录里**里面的js文件到手机的** /sdcard/脚本**里面,然后把configs中的serverIP改成你的服务器IP.
3. 在手机上运行刚才复制的一个叫**client.js**的文件,这个脚本会一直尝试连接服务器的8811端口,以便进行socket通信
4. ecosystem.json中配置项自己看着改.
5. 在项目根目录,也就是app.js所在的文件夹,打开cmd窗口,输入
`pm2 deploy ecosystem.json production setup`,
等运行完了再输入`pm2 deploy ecosystem.json production`,
服务就开起来了,输入你的域名,就可以在线编辑代码了,
6. 账号是**autojs@qq.com**  密码是**123**
7. 网页左边是项目文件的目录,中间是代码编辑区,右边是编辑,修改,和运行手机端index.js文件的三个按钮.
7.  新增一个按钮,可以给指定手机发送脚本,按钮下方填写手机的唯一标识码,比如`nubia/NX569J/NX569J:6.0.1/MMB29M/nubia04232153:user/release-keys;`,用分号隔开
8. 是否更新代码是通过**版本号**控制的,版本号在每个项目文件夹的**index.js**文件中保存
9. scriptVersionNumber=3   这个就是版本号,是整数,如果要更新代码,就把版本号改大,比如5.
10. 点击右边的编辑,才能修改代码
11. 点击右边的保存,会保存代码,
12. 点击右边的运行index.js文件,服务器会将当前项目压缩为zip文件,通知手机下载该文件,手机端自动解压,并运行index.js脚本
13. 点击右边的运行index.js文件,压缩项目文件之前会检查是否有index.js文件,没有的话会创建index.js,再压缩项目文件.
14. 默认的index.js文件是`'\nscriptVersionNumber=1\nalert("hello world")\n'`

不懂的可以进群咨询：**962332980**

