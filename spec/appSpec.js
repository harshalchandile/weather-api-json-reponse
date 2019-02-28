const axios = require("axios");
const config = require('../config')

describe("Weather API JSON", function() {
  describe("Validate Weather API /", function() {

    it("returns status code 200", function(done) {
      let weather = axios.get(`https://api.darksky.net/forecast/${config.api_key}/21.0620538,74.9910112`)
        weather.then((res) => {
            expect(res.status).toBe(200)
            done()
        })
    })
    
  })
})