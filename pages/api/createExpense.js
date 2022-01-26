const server = 'http://localhost:3000';
const fs = require('fs');

async function calculateDebts(data) {
  const currentAmounts = JSON.parse(fs.readFileSync('/owedAmounts.json'));
  const owedByEach = Math.round(((parseFloat(data.amount) / data.splitWith.length) + Number.EPSILON) * 100) / 100;
  await data.splitWith.map(p => {
    currentAmounts[p][0][data.paidBy] = owedByEach + currentAmounts[p][0][data.paidBy];
  });

  const reponse = await fetch(`${server}/api/getOwedAmounts`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(currentAmounts),
  });
}

async function appendHistory(data) {
  const hist = JSON.parse(fs.readFileSync('public/transactionHistory.json'));
  hist['transactions'].push(data);
  console.log(hist);
  fs.writeFileSync('public/transactionHistory.json', JSON.stringify(hist));
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed'});
    return;
  }
  const body = req.body;
  calculateDebts(body);
  appendHistory(body);
  res.status(200).json({message: 'Recieved.'});
}