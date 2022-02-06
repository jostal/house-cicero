import { useEffect, useState } from "react"

export default function TransactionHistory(props) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async() => {
      const res = await fetch('https://99.225.180.173:1337/getTransactionHistory');
      const data = await res.json();
      console.log(data);
      console.log(data['transactions'].length)
      for (var i = 0; i < data['transactions'].length; i++) {
        setHistory(history => [...history, data['transactions'][i]]);
      }
    }
    fetchHistory();
  }, [props.updateHist])


  function expenseRow(data) {
    return (
      <tr className="flex w-full text-center bg-red-900 border-2 border-black items-center">
        <td className="p-4 w-1/4 uppercase">{data.type}</td>
        <td className="p-4 w-1/4">{data.paidBy}</td>
        <td className="p-4 w-1/4">{data.splitWith.map(p => {return <p key={p}>{p}</p>})}</td>
        <td className="p-4 w-1/4">${data.amount}</td>
      </tr>
    )
  }

  function debtRow(data) {
    return (
      <tr className="flex w-full text-center bg-green-800 border-2 border-black">
        <td className="uppercase p-4 w-1/4">{data.type}</td>
        <td className="p-4 w-1/4">{data.paidBy}</td>
        <td className="p-4 w-1/4">{data.paid}</td>
        <td className="p-4 w-1/4">${data.amount}</td>
      </tr>
    )
  }

  return (
    <table className="mt-12 w-full text-sm lg:w-3/4 mb-24"> 
      <p className="text-center text-xl mb-2"><strong>Transaction History</strong></p>
      <thead className="bg-orange-700 flex w-full p-2 border-2 border-black">
        <tr className="w-full flex items-center">
          <th className="w-1/4">Transaction Type</th>
          <th className="w-1/4">Paid by</th>
          <th className="w-1/4">Paid to/Split Amongst</th>
          <th className="w-1/4">($) Amount</th>
        </tr>
      </thead>
      <tbody className="bg-stone-800 flex flex-col items-center justify-between overflow-y-scroll w-full max-h-96">
        {history.slice(0).reverse().map(tArr => {
          if (tArr.type === 'expense') return (expenseRow(tArr))
          if (tArr.type === 'debt') return (debtRow(tArr))
        })}
      </tbody>
    </table>
  )
}
