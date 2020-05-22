
exports.handler = async function http(req) {
  // var Airtable = require('airtable');
  // var base = new Airtable({apiKey: 'key3h0orLfvwRORrf'}).base('appJqUbXilt8QG73R');

  // console.log('will fetch')

  // const resposta = base('Fornecedores').select({
  //   // Selecting the first 3 records in Grid view:
  //   maxRecords: 3,
  //   view: "Grid view"
  // }).eachPage(function page(records, fetchNextPage) {
  //   // This function (`page`) will get called for each page of records.
  //   console.log('each page')

  //   records.forEach(function(record) {
  //     console.log('Retrieved', record.get('Cadastro'));
  //   });

  //   // To fetch the next page of records, call `fetchNextPage`.
  //   // If there are more records, `page` will get called again.
  //   // If there are no more records, `done` will get called.
  //   fetchNextPage();

  // }, function done(err) {
  //   if (err) { console.error(err); return; }
  // });

  // console.log(resposta)

  console.log('Begin API called')

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify({
      message: resposta
    })
  }
}
