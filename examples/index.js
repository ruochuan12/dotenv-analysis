const fs = require('fs')
const path = require('path')

const parse = function parse(src){
    const obj = {};
    src.toString().split('\n').forEach(function(line, index){
        const keyValueArr = line.split('=');
        key = keyValueArr[0];
        val = keyValueArr[1] || '';
        obj[key] = val;
    });
    return obj;
}

const config = function(){
    let dotenvPath = path.resolve(process.cwd(), '.env');
    const parsed = parse(fs.readFileSync(dotenvPath, 'utf-8'));

    Object.keys(parsed).forEach(function(key){
        if(!Object.prototype.hasOwnProperty.call(process.env, key)){
            process.env[key] = parsed[key];
        }
    });

    return parsed;
};

console.log(config());
console.log(process.env);

module.exports.config = config;
module.exports.config = parse;


