import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import Notloggedin from './Navbar/Notloggedin'
import Loggedin from './Navbar/Loggedin'
function Navbar() {
    const { data: session, status } = useSession()
    if (status === "error") return <p>{error.message}</p>
    if (status === "loading") return (<div>
        <div className="navbar bg-base-100" >
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Artverse</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/explore"}>Explore</Link></li>
                </ul>
            </div>
        </div>
    </div>)
    if (!session) {
        return (
            <Notloggedin />
        )
    } else {
        return (
            <Loggedin />
        )
    }
}

export default Navbar