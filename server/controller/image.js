// const handleApiCall = (req, res) => {
//   const api = '2ac7ce01b0a44b3e83f45cc6b3e0bea3';
//   return api;
// }


const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => { res.json(entries[0].entries) })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
}

