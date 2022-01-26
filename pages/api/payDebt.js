const fs = require('fs');

async function deductAmount(data) {
  const currentAmounts = JSON.parse(fs.readFileSync('./data/owedAmounts.json'));
  const amountToDeduct = data.amount;
  currentAmounts[data.paidBy][0][data.paid] = currentAmounts[data.paidBy][0][data.paid] - amountToDeduct;
  fs.writeFileSync('./data/owedAmounts.json', JSON.stringify(currentAmounts));
}

async function appendHistory(data) {
  const hist = JSON.parse(fs.readFileSync('./data/transactionHistory.json'));
  hist['transactions'].push(data);
  console.log(hist);
  fs.writeFileSync('./data/transactionHistory.json', JSON.stringify(hist));
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({message: "POST request only."});
    return;
  }

  deductAmount(req.body);
  appendHistory(req.body);
  res.status(200).json({message: 'Recieved.'});
}