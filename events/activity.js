function activity(client) {
    return new Promise((resolve, reject) => {
      var memberCount = 0; // Initialize to 0
  
      client.guilds.cache.forEach((guild) => {
        // Add up all the members from each guild
        memberCount += guild.memberCount;
      });
  
      // Resolve if there are any members, reject otherwise
      if (memberCount >= 0) {
        resolve(memberCount);
      } else {
        reject('No members found');
      }
    });
  }
  
  module.exports = { activity };
  