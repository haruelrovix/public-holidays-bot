const { google } = require('googleapis')
const { startOfWeek, endOfWeek } = require('date-fns/fp')

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
    console.info(`\n${data.summary}`)
    data.items.forEach(item => {
      console.info(`${item.summary} (${item.start.date})`)
    });
  } catch (e) {
    console.error(e)
  }
}

const countries = ['indonesian', 'singapore', 'indian', 'ir', 'turkish']
for (const country of countries) {
  getHolidays(country)
}
