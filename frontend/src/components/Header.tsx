"use client"
// Module
import Link from "next/link"
import { useEffect } from "react"
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "@/helpers/localstorage.helper"
import { AuthService } from "@/services/auth.service"
import { useAppDispatch } from "@/store/hooks"
import { login, logout } from "@/store/user/userSlice"
// Images

// Styles
import styles from "@/styles/app.module.scss"
import container from "@/styles/container.module.scss"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
// Components

export function Header() {
	const dispath = useAppDispatch()
	const router = useRouter()

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await AuthService.getProfile()

				if (data) {
					dispath(login(data))
				} else {
					dispath(logout())
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	const isAuth = useAuth()

	const logoutHandler = () => {
		dispath(logout())
		removeTokenFromLocalStorage("token")
		toast.success("Вы вышли из аккаунта!")
		router.push("/")
	}

	return (
		<div className={styles.header}>
			<div className={container.container}>
				<div className={styles.header__inner}>
					<h1 className={styles.header__logo}>Список добрых дел</h1>
					{isAuth ? (
						<button onClick={logoutHandler} className={styles["btn-black"]}>
							Выйти
						</button>
					) : (
						<div className={styles.header__link}>
							<Link href="/auth">Log in / Sign in</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
