import CsvToJson from "../components/csvToJson"

export default function chores() {

  return (
    <div>
      <CsvToJson filename='/choresTodo.csv' type='todo' />
      <CsvToJson filename='/choresAssigned.csv' type='calendar' />
    </div>
  )
}