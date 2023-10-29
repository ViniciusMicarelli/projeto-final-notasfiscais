"use client"

import Image from "next/image";
import loginimage from "@/images/login.jpg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { serverLogin } from "@/actions/auth";

export default function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const { push } = useRouter()

    function login(e){
        e.preventDefault()
        if (email === "testefiap" && senha === "123"){
            serverLogin()
            push("/")
        }else{
            toast.error("Credenciais Inválidas", {
                style: {
                    backgroundColor: '#333',
                    color: '#fff'
                }
            })
        }
    }


    window.watsonAssistantChatOptions = {
        integrationID: "12c4a5bd-7a8d-4309-a13d-c5bc209f88a2", // The ID of this integration.
        region: "us-south", // The region your integration is hosted in.
        serviceInstanceID: "df34facd-d05d-4f95-9440-419c759aa83c", // The ID of your service instance.
        onLoad: function(instance) { instance.render(); }
      };
      setTimeout(function(){
        const t=document.createElement('script');
        t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
        document.head.appendChild(t);
      });

    return(
        

        <div className="flex h-screen">
            <aside className="hidden md:flex ">
                <Image className="h-full w-full object-cover" src={loginimage} alt=""/>
            </aside>

            <main className="container m-auto max-w-md p-6 ">
                <h1 className="text-xl font-bold text-center">REGISTROS SANOFI</h1>
                <form onSubmit={login} className="flex flex-col">

                    <label htmlFor="email">Usuário</label>
                    <input 
                        className="bg-slate-600 p-1 rounded" 
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}    
                    />

                    <label htmlFor="senha">Senha</label>
                    <input 
                        className="bg-slate-600 p-1 rounded" 
                        type="password" 
                        id="senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}   
                    />

                    <button className="bg-pink-600 p-2 mt-2 rounded" >Entrar</button>

                </form>
            </main>

        </div>
    )
}