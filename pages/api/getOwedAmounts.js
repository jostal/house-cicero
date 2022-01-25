const fs = require('fs');

let owedAmounts = require('../../public/owedAmounts.json');

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    fs.writeFileSync('public/owedAmounts.json', JSON.stringify(req.body));
  }
  const jsonData = JSON.stringify(owedAmounts);
  res.status(200).json(jsonData);
}