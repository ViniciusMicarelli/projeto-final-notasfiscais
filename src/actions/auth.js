"use server"

import { cookies } from 'next/headers'

export async function serverLogin(){
    cookies().set("user_email", "joao@fiap.com.br", {
        maxAge: 60 * 60 * 24 * 7    // 7 dias 
    })
}

export async function serverLogout(){
    cookies().delete("user_email")
}