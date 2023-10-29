"use client"

import { serverLogout } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NavBar(){
    const { push } = useRouter()
    
    function logout(){
        serverLogout()
        push("/login")
    }

    return (
        <nav className="flex items-end gap-4 bg-blue-500 p-4">
            <Link href="/">
                <h1 className="text-3xl font-bold">Receipt OCR Scanner</h1>
            </Link>
            <button className="pl-8"onClick={logout}>logout</button>
        </nav>
    )
}