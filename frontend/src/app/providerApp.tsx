"use client"
import { store } from "@/store/store"
import { Provider } from "react-redux"

export function ProviderApp({ children }: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>
}
