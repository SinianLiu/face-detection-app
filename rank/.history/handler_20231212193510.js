'use strict';

const emojis = ['👍', '👎', '😂', '😮', '😡']


module.exports.count = async (event) => {
  const count = event.rawQueryString.count
  const countEmoji = emojis[count > emojis.length ? emojis.length - 1 : count]


  return {
    statusCode: 200,
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
