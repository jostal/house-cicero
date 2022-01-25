/* eslint-disable @next/next/link-passhref */
import Link from "next/link"

export default function Home() {
  return (
    <div className="text-center transform translate-y-full">
      <div className="mt-12 text-xl"><strong>Which page would you like to visit?</strong></div>
      <div className="flex flex-col gap-3 text-xl mt-4">
        <Link href="/chores"><p className="hover:text-orange-600">Chores</p></Link>
        <Link href="/finance"><p className="hover:text-orange-600">Financial Tool</p></Link>
      </div>
    </div>
  )
}
