import { useState, useEffect } from "react"

export default function ExpenseForm(props) {
  const [expenseAmount, setExpenseAmount] = useState("0");
  const [whoPaid, setWhoPaid] = useState("");
  const [splitWith, setSplitWith] = useState([]);

  useEffect(() => {
    console.log(splitWith);
  }, [splitWith])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const reponse = await fetch('/api/createExpense', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({paidBy: whoPaid, splitWith: splitWith, amount: expenseAmount, type: 'expense'}),
    });

    props.isClicked(false);
  }

  function handleSplit(person) {
    if (!splitWith.includes(person) || splitWith.length === 0) {
      setSplitWith(splitWith => [...splitWith, person]);
    } else {
      setSplitWith(splitWith.filter((i) => i !== person));
    }
  }

  return (
    <div className="absolute flex items-center justify-center top-1/4 bg-zinc-800 p-5 w-3/4 lg:w-1/3 rounded-lg border-red-700 border-2">
      <form>
        <p>Who paid for this expense?</p>
        <div className="my-2 flex gap-5">
          <div className="flex flex-col gap-4">
            <div>
              <input id="jtPaid" type="checkbox" onChange={() => setWhoPaid("Joey")}/>
              <label htmlFor="jtPaid" className="ml-2">Joey</label>
            </div>
            
            <div>
              <input id="mtPaid" type="checkbox" onChange={() => setWhoPaid("Martin")}/>
              <label htmlFor="mtPaid" className="ml-2">Martin</label>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <input id="tdPaid" type="checkbox" onChange={() => setWhoPaid("Tony")}/>
              <label htmlFor="tdPaid" className="ml-2">Tony</label>
            </div>
          
            <div>
              <input id="tlPaid" type="checkbox" onChange={() => setWhoPaid("Tyler")}/>
              <label htmlFor="tlPaid" className="ml-2">Tyler</label>
            </div>
          </div>
        </div>

        <br/>
        <label htmlFor="amount">Expense Amount:</label><br />
        $&nbsp;<input type="text" className="mt-2 rounded text-black" value={expenseAmount} onChange={(e) => {setExpenseAmount(e.target.value)}}/>

        <br/>
        <p className="mt-5">Split expense with:</p>
        <div className="flex flex-col gap-2 mt-2">
          <div>
            <input id="jtSplit" type="checkbox" onChange={() => handleSplit('Joey')}/>
            <label htmlFor="jtSplit" className="ml-2">Joey</label>
          </div>
          
          <div>
            <input id="mtSplit" type="checkbox" onChange={() => handleSplit('Martin')}/>
            <label htmlFor="mtSplit" className="ml-2">Martin</label>
          </div>
         
          <div>
            <input id="tdSplit" type="checkbox" onChange={() => handleSplit('Tony')}/>
            <label htmlFor="tdSplit" className="ml-2">Tony</label>
          </div>
          
          <div>
            <input id="tlSplit" type="checkbox" onChange={() => handleSplit('Tyler')}/>
            <label htmlFor="tlSplit" className="ml-2">Tyler</label>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button type="button" className="bg-red-700 p-1 rounded w-1/3" onClick={(e) => handleSubmit(e)}>Submit</button>
          <button type="button" className="bg-gray-600 p-1 rounded w-1/3" onClick={() => props.isClicked(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}