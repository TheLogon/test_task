import { ProviderApp } from "@/app/providerApp"
import "@/styles/global.scss"
import type { Metadata } from "next"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const metadata: Metadata = {
	title: "Список добрых дел",
	description: "Создай свой список добрых дел и делись с друзьями",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<body>
				<ProviderApp>{children}</ProviderApp>
				<ToastContainer position="bottom-left" autoClose={2000} />
			</body>
		</html>
	)
}
