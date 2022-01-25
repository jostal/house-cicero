/* eslint-disable @next/next/link-passhref */
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isClicked, setIsClicked] = useState(false);
  const [date, setDate] = useState('Date unkown');

  useEffect(() => {
    const today = new Date();
    setDate((today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate()) + '/' 
    + ((today.getMonth() + 1) < 10 ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1)) + '/' + today.getFullYear())
  }, [])

  function showNav() {

    return (
      <div className="flex flex-col w-24 p-3 gap-1 border-r border-solid border-orange-700">
        <Link href="/chores">Chores</Link>
        <Link href="/finance">Financial Tool</Link>
      </div>
    )
  }

  return (
    <nav className="p-4 bg-cyan-900 text-white w-full">
      <div className="lg:hidden">
        <button onClick={() => setIsClicked(!isClicked)}><Image src="/hamburger.png" height="25px" width="25px" alt="hamburg"/></button>
        {isClicked && showNav()}
        <p className="absolute right-1/4 left-1/4 top-1 text-center text-lg"><strong>The current date is:<br/></strong> {date}</p>
      </div>
      <div className="hidden lg:flex">
        <div className="flex gap-5 p-2 text-xl">
          <Link href="/chores"><p className="hover:text-orange-600">Chores</p></Link>
          <Link href="/finance"><p className="hover:text-orange-600">Financial Tool</p></Link>
        </div>
        <p className="text-xl ml-auto mr-auto text-center transform -translate-x-1/2"><strong>The current date is:<br/></strong> {date}</p>
      </div>
    </nav>
  )
}