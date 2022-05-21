const axios = require('axios')
const { MessageEmbed } = require('discord.js')

async function getData() {
    const time = Math.floor(Date.now() / 1000)
    const config = {
        method: 'get',
        url: `https://ctftime.org/api/v1/events/?limit=25&start=${time}`,
        headers: { 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0' }
    };
    let {data: contestArr} = await axios(config)
    contestArr = contestArr.filter(contest => contest.onsite == false)
    contestArr = contestArr.slice(0, 5)
    return contestArr
}

function getEmbeds(contestArr) {
    let embedArr = []
    contestArr.forEach( contest => {
        const emb = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(contest.title)
                    .setURL(contest.url)
                    .setDescription('')
                    .addField('Start Time', new Date(contest.start).toUTCString())
                    .addField('Duration', `${contest.duration.days ?? 0} days ${contest.duration.hours ?? 0} hours`)
                    .addField('Format', contest.format)
        embedArr.push(emb)
    })
    return embedArr
}

module.exports = {
    description: 'Shows upcoming CTFs',
    slash: true,
    testOnly: true,
    callback: async ({interaction}) => {
        const contestArr = await getData()
        interaction.reply({embeds: getEmbeds(contestArr)})
    }
}