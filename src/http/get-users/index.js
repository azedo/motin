const fetch = require('node-fetch')

exports.handler = async function http(req) {
  async function fetchData() {
    try {
      let data = await fetch(
        `https://api.airtable.com/v0/appJqUbXilt8QG73R/Fornecedores?view=Grid%20view&api_key=key3h0orLfvwRORrf`
      ).then((res) => res.json())

      return data
    } catch (err) {
      console.log(err.message)

      return `There was an error in your request => ${err.message}`
    }
  }

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    },
    body: JSON.stringify(await fetchData()),
  }
}
