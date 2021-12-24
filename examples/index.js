const fs = require('fs');
const path = require('path');

const parse = function parse(src){
    const obj = {};
    // 用换行符 分割
    // 比如
    /**
     * NAME=若川
     * AGE=18
     * MP_WEIXIN=若川视野
     * BLOG=https://lxchuan12.gitee.io
     * ACTIVITY=每周一起学200行左右的源码共读活动
     * WEIXIN=加我微信 ruochuan12 参与
    */
    src.toString().split('\n').forEach(function(line, index){
        // 用等号分割
        const keyValueArr = line.split('=');
        // NAME
        key = keyValueArr[0];
        // 若川
        val = keyValueArr[1] || '';
        obj[key] = val;
    });
    // { NAME: '若川', ... }
    return obj;
}

const config = function(){
    // 读取 node 执行的当前路径下的 .env 文件
    let dotenvPath = path.resolve(process.cwd(), '.env');
    // 按 utf-8 解析文件，得到对象
    // { NAME: '若川', ... }
    const parsed = parse(fs.readFileSync(dotenvPath));

    // 键值对形式赋值到 process.env 变量上，原先存在的不赋值
    Object.keys(parsed).forEach(function(key){
        if(!Object.prototype.hasOwnProperty.call(process.env, key)){
            process.env[key] = parsed[key];
        }
    });

    // 返回对象
    return parsed;
};

console.log(config());
console.log(process.env);

// 导出 config parse 函数
module.exports.config = config;
module.exports.parse = parse;


