const MinecraftServerUtil = require("minecraft-server-util");

async function mcStatus(ip, port, version) {
  const portnum = port || 25565; // Default to 25565 if no port is provided

  if (version == "java") {
    return new Promise((resolve, reject) => {
      MinecraftServerUtil.status(ip, portnum)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }else if(version == 'bedrock'){
    return new Promise((resolve, reject) => {
        MinecraftServerUtil.statusBedrock(ip, portnum)
        .then((data)=>{
            resolve(data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
  }
}

module.exports = { mcStatus };
