const fs = require('fs');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({message: "Get requests only."});
  }
  var hist = fs.readFileSync('/transactionHistory.json');
  res.status(200).json(hist);
}