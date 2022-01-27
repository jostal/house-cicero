import { useState } from "react"

export default function DebtForm(props) {
  const [amountPaid, setAmountPaid] = useState('0');
  const [personPaying, setPersonPaying] = useState('');
  const [payingTo, setPayingTo] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch('http://99.225.180.173:1337/payDebt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({paidBy: personPaying, paid: payingTo, amount: amountPaid, type: 'debt'})
    })

    props.isClicked(false);
  }

  return (
    <div className="absolute flex items-center justify-center top-1/4 bg-zinc-800 p-5 w-3/4 lg:w-1/3 rounded-lg border-green-700 border-2">
      <form>
        <p>Who is paying their debt?</p>
        <div className="my-2 flex gap-5">
          <div className="flex flex-col gap-4">
            <div>
              <input id="jtPaid" type="checkbox" onChange={() => setPersonPaying('Joey')}/>
              <label htmlFor="jtPaid" className="ml-2">Joey</label>
            </div>
            
            <div>
              <input id="mtPaid" type="checkbox" onChange={() => setPersonPaying('Martin')}/>
              <label htmlFor="mtPaid" className="ml-2">Martin</label>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <input id="tdPaid" type="checkbox" onChange={() => setPersonPaying('Tony')}/>
              <label htmlFor="tdPaid" className="ml-2">Tony</label>
            </div>
          
            <div>
              <input id="tlPaid" type="checkbox" onChange={() => setPersonPaying('Tyler')}/>
              <label htmlFor="tlPaid" className="ml-2">Tyler</label>
            </div>
          </div>
        </div>

        <br/>
        <label htmlFor="amount">Amount Paid:</label><br />
        $&nbsp;<input type="text" className="mt-2 rounded text-black" value={amountPaid} onChange={(e) => {setAmountPaid(e.target.value)}}/>

        <br/>
        <p className="mt-5">Paid to (choose one):</p>
        <div className="flex flex-col gap-2 mt-2">
          <div>
            <input id="jtTo" type="checkbox" onChange={() => setPayingTo('Joey')}/>
            <label htmlFor="jtTo" className="ml-2">Joey</label>
          </div>
          
          <div>
            <input id="mtTo" type="checkbox" onChange={() => setPayingTo('Martin')}/>
            <label htmlFor="mtTo" className="ml-2">Martin</label>
          </div>
         
          <div>
            <input id="tdTo" type="checkbox" onChange={() => setPayingTo('Tony')}/>
            <label htmlFor="tdTo" className="ml-2">Tony</label>
          </div>
          
          <div>
            <input id="tlTo" type="checkbox" onChange={() => setPayingTo('Tyler')}/>
            <label htmlFor="tlTo" className="ml-2">Tyler</label>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button type="button" className="bg-green-700 p-1 rounded w-1/3" onClick={(e) => handleSubmit(e)}>Submit</button>
          <button type="button" className="bg-gray-600 p-1 rounded w-1/3" onClick={() => props.isClicked(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}