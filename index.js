const { google } = require('googleapis')

const getHolidays = async country => {
  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: process.env.API_KEY
    })

    const params = {
      calendarId: `en.${country}#holiday@group.v.calendar.google.com`,
      timeMin: '2020-05-01T00:00:00.000Z',
      timeMax: '2020-05-30T00:00:00.000Z'
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
