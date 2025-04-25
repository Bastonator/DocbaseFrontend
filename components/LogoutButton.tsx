"use client";
 
import { useRouter } from "next/navigation";
import React from "react";
import { resetAuthCookies } from "@/app/lib/actions";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const submitLogout = async () => {
        resetAuthCookies();

        router.push('/Login')
    }

    return (
        <>
        <button type="submit" className="mobile-sign-ou-button" onClick={submitLogout}>
            <img src="/Wriber.png" alt="logout" width={24} height={24}/>
            <p>Logout</p>
        </button>
        </>
    )
}

