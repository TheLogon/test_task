"use client"
import Link from "next/link"
import styles from "@/styles/app.module.scss"
import container from "@/styles/container.module.scss"
import { useState } from "react"
import { AuthService } from "@/services/auth.service"
import { toast } from "react-toastify"
import { setTokenToLocalStorage } from "@/helpers/localstorage.helper"
import { useAppDispatch } from "@/store/hooks"
import { login } from "@/store/user/userSlice"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"

export default function Auth() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLogin, setIsLogin] = useState(false)
	const dispatch = useAppDispatch()
	const router = useRouter()

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })

			if (data) {
				setTokenToLocalStorage("token", data.token)
				dispatch(login(data))
				toast.success("Вы успешно вошли!")
				router.push("/user")
			}
		} catch (err: any) {
			const error = err.responce?.data.message
			toast.error(error)
		}
	}

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success("Вы успешно зарегестрировались!")
				setIsLogin(!isLogin)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error)
		}
	}

	return (
		<div>
			<Header />
			<main className={styles.main}>
				<div className={container.container}>
					<div className={styles.window}>
						<form onSubmit={isLogin ? loginHandler : registrationHandler} className={[styles.window__inner, styles.form].join(" ")}>
							<h2 className={styles.form__title}>{isLogin ? "Авторизация" : "Регистрация"}</h2>

							<div className={styles.form__input}>
								<input type="text" placeholder="Email" className={styles.input} onChange={e => setEmail(e.target.value)} />
							</div>
							<div className={styles.form__input}>
								<input type="password" placeholder="Пароль" className={styles.input} onChange={e => setPassword(e.target.value)} />
							</div>
							<button className={styles["btn-green"]}>{isLogin ? "Авторизоваться" : "Зарегестрироваться"}</button>
							{isLogin ? (
								<button onClick={() => setIsLogin(!isLogin)} className={styles["btn-text"]}>
									Нет аккаунта?
								</button>
							) : (
								<button onClick={() => setIsLogin(!isLogin)} className={styles["btn-text"]}>
									Уже есть аккаунт?
								</button>
							)}
						</form>
					</div>
				</div>
			</main>
		</div>
	)
}
