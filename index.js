const { google } = require('googleapis')
const { startOfWeek, endOfWeek } = require('date-fns/fp')
const { IncomingWebhook } = require('@slack/webhook')

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL)
const sendMessage = async text => await webhook.send({ text })

const getHolidays = async country => {
  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: process.env.API_KEY
    })

    const params = {
      calendarId: `en.${country}#holiday@group.v.calendar.google.com`,
      timeMin: startOfWeek(new Date()),
      timeMax: endOfWeek(new Date())
    }

    const { data } = await calendar.events.list(params)

    let text = `*${data.summary}*\n`
    data.items.forEach(item => {
      text += `${item.summary} (${item.start.date})\n`
    })

    await sendMessage(text)
  } catch (e) {
    console.error(e)
  }
}

const showMeHolidays = async () => {
  const countries = ['indonesian', 'singapore', 'indian', 'ir', 'turkish']
  for (const country of countries) {
    await getHolidays(country)
  }

  sendMessage('_Source: <https://developers.google.com/calendar|Calendar API>_')
}

sendMessage('Public holidays this week guys <!here|here>! :beach_with_umbrella:')
showMeHolidays()
