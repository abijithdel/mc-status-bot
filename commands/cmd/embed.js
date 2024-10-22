const { Embed } = require('../../events/Embed/embed')

function embedMessage(title, description, time, footer, color, interaction){
    if(footer){
        footer = 'Embed'
    }
    

    Embed(title, description, time, footer, color, interaction)

}

module.exports = { embedMessage  }