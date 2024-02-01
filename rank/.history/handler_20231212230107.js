'use strict';

const emojis = ['👍', '👎', '😂', '😮', '😡']
const querystring = require('querystring');

module.exports.count = async (event) => {
  const params = querystring.parse(event.rawQueryString);
  const count = Number(params.count);

  // const count = event.rawQueryString.count
  const countEmoji = emojis[count > emojis.length ? emojis.length - 1 : count]


  return {
    statusCode: 200,
    header: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: countEmoji,
      },
      null,
      2
    ),
  };

};
