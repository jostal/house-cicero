import { useState, useEffect } from "react"
import ExpenseForm from "./ExpenseForm"
import DebtForm from "./DebtForm"
import TransactionHistory from "./TransactionHistory"

export default function OwedAmounts(props) {
  const [amounts, setAmounts] = useState({});
  const [expenseClicked, setExpenseClicked] = useState(false);
  const [debtClicked, setDebtClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updateComp, setUpdateComp] = useState(false);

  useEffect(() => {
    const fetchAmounts = async() => {
      const res = await fetch('http://99.225.180.173:1337/getOwedAmounts');
      const data = await res.json();
      setAmounts(JSON.parse(JSON.stringify(data)));
      setIsLoading(false);
    };
    fetchAmounts();
  }, [])
  
  useEffect(() => {
    const fetchAmounts = async() => {
      const res = await fetch('http://99.225.180.173:1337/getOwedAmounts');
      const data = await res.json();
      console.log(data);
      setAmounts(JSON.parse(JSON.stringify(data)));
      setIsLoading(false);
    };
    fetchAmounts();
    setUpdateComp(true);
  }, [expenseClicked, debtClicked])

  function showAmountOwed() {
    if (!isLoading) {
      const owedByJoey = amounts.Joey[0];
      const owedByMartin = amounts.Martin[0];
      const owedByTony = amounts.Tony[0];
      const owedByTyler = amounts.Tyler[0];

      return (
        <div className="flex flex-wrap justify-center gap-24 p-4 mt-12">
          <div>
            <p><strong>Joey owes:</strong></p>
            <div className="ml-3">
              <em>Martin:</em> ${owedByJoey.Martin}<br/>
              <em>Tony:</em> ${owedByJoey.Tony}<br/>
              <em>Tyler:</em> ${owedByJoey.Tyler}
            </div>
          </div>
          <div>
            <p><strong>Martin owes:</strong></p>
            <div className="ml-3">
              <em>Joey:</em> ${owedByMartin.Joey}<br/>
              <em>Tony:</em> ${owedByMartin.Tony}<br/>
              <em>Tyler:</em> ${owedByMartin.Tyler}
            </div>
          </div>
          <div>
            <p><strong>Tony owes:</strong></p>
            <div className="ml-3">
              <em>Martin:</em> ${owedByTony.Martin}<br/>
              <em>Joey:</em> ${owedByTony.Joey}<br/>
              <em>Tyler:</em> ${owedByTony.Tyler}
            </div>
          </div>
          <div>
            <p><strong>Tyler owes:</strong></p>
            <div className="ml-3">
              <em>Martin:</em> ${owedByTyler.Martin}<br/>
              <em>Tony:</em> ${owedByTyler.Tony}<br/>
              <em>Joey:</em> ${owedByTyler.Joey}
            </div>
          </div>
          
        </div>
    )
    }
    
  }

  return (
    <div className="lg:mt-32">
      {showAmountOwed()}
      <div className="flex gap-4 justify-center mt-12">
        <button className="bg-red-700 p-1 rounded w-1/3 lg:w-1/6" onClick={() => setExpenseClicked(true)}>Create Expense</button>
        <button className="bg-green-700 p-1 rounded w-1/3 lg:w-1/6" onClick={() => setDebtClicked(true)}>Pay Debt</button>
        {expenseClicked && <ExpenseForm isClicked={setExpenseClicked}/>}
        {debtClicked && <DebtForm isClicked={setDebtClicked}/>}
      </div>
      <div className="w-full flex justify-center mt-24">
        <TransactionHistory updateHist={updateComp}/>
      </div>
    </div>
  )
}
