//만약 process의 key가 production에서 가져온 것이면 prod.js에서 module을 가져오고
console.log("config process node_env : " + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    // process가 development(배포 사이트)에서 가져온 것이면 dev.js에서 module을 가져오는 것
    module.exports = require('./dev');
}