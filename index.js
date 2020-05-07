const { google } = require('googleapis')

const a = async () => {
  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: process.env.API_KEY
    })

    const params = {
      calendarId: 'en.indonesian#holiday@group.v.calendar.google.com',
      timeMin: '2020-05-01T00:00:00.000Z',
      timeMax: '2020-05-30T00:00:00.000Z'
    }

    const { data } = await calendar.events.list(params)
    console.info(data.summary)
    data.items.forEach(item => {
      console.info(`${item.summary} (${item.start.date})`)
    });
  } catch (e) {
    console.error(e)
  }
}

a()
