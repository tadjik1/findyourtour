/*
* This is small utility script that enriches original data with images from unsplash.com. Hopefully
* with similar meaning (it uses tour title as search query for photo).
*
* for usage run "node data/enrich_data"
* */

/* eslint-disable no-console */

const axios = require('axios')
const data = require('./original_data.json')
const uuid = require('uuid/v4')
const path = require('path')
const fs = require('fs')
const client = axios.create({
  validateStatus (status) { return status === 302 },
  maxRedirects: 0
})

async function main () {
  const images = await Promise.all(data.tours.map(tour => {
    return client.get(
      `https://source.unsplash.com/1600x900?${encodeURIComponent(tour.title)}`
    ).then(response => response.headers.location)
  }))

  for (let i = 0; i < data.tours.length; i++) {
    const tour = data.tours[i]
    tour['id'] = uuid()
    tour.price = Number(tour.price)
    tour.rating = Number(tour.rating)
    tour.image = images[i]
  }

  fs.writeFileSync(
    path.join(__dirname, '../src/assets/tours.json'),
    JSON.stringify(data, null, 2)
  )
}

main()
  .then(() => console.log('all done'))
  .catch(console.error)
