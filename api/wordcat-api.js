const fetch = require('node-fetch');
const wordnikKey = '';

exports.endpoint = async (request, response) =>
    await fetch(
        `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${wordnikKey}`
    )
        .then((reply) => reply.text())
        .then((data) => response.end(data));
