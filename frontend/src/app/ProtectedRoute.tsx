"use client"
// Module
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
// Images

// Styles
// Components

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const isAuth = useAuth()

	return <>{isAuth ? children : <></>}</>
}
