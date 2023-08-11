"use client"
import Link from "next/link"
import styles from "@/styles/app.module.scss"
import container from "@/styles/container.module.scss"
import { Header } from "@/components/Header"
import { ProtectedRoute } from "../ProtectedRoute"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TextService } from "@/services/text.service"
import { IResponseFriend, IResponseText, IResponseTextData, IResponseUser } from "@/types/types"
import { logout } from "@/store/user/userSlice"
import { removeTokenFromLocalStorage } from "@/helpers/localstorage.helper"
import { useRouter } from "next/navigation"
import { UserService } from "@/services/user.service"
import { AuthService } from "@/services/auth.service"
import { useAppDispatch } from "@/store/hooks"
import { FriendsService } from "@/services/friend.service"

export default function User() {
	const [text, setText] = useState("")
	const [changeText, setChangeText] = useState("")
	const [changeEmail, setChangeEmail] = useState("")
	const [friendId, setFriendId] = useState("")
	const [input, setInput] = useState(false)
	const [deeds, setDeeds] = useState<IResponseText[]>([])
	const [friends, setFriends] = useState<IResponseFriend[]>([])
	const router = useRouter()
	const dispath = useAppDispatch()

	// Text

	const formTextHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()

			const data = await TextService.addText({ text })
			if (data) {
				toast.success("Вы добавили новое дело!")
				textLoader()
				setText("")
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error)
		}
	}

	const textLoader = async () => {
		const data = await TextService.loaderText()
		setDeeds(data)
	}

	const deleteTextHandler = async (id: number) => {
		try {
			const data = await TextService.deleteText(id)
			if (data) {
				toast.success("Вы удалили дело!")
				textLoader()
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error)
		}
	}

	const patchTextHandler = async ({ id, inputText }: IResponseTextData) => {
		try {
			const data = await TextService.patchText({ id, inputText })
			if (data) {
				toast.success("Вы успешно изменили дело!")
				setInput(false)
				textLoader()
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error)
		}
	}

	// User

	const logoutUserHandler = (text: string) => {
		dispath(logout())
		removeTokenFromLocalStorage("token")
		toast.success(text)
		router.push("/")
	}

	const deleteUserHandler = async () => {
		try {
			const user = await AuthService.getProfile()
			const id = user?.id
			await UserService.deleteUser(id)
		} catch (err: any) {
			toast.error(err)
		}
	}

	const patchUserHandler = async ({ inputEmail }: { inputEmail: string }) => {
		try {
			const user = await AuthService.getProfile()
			const id = user?.id
			const data = await UserService.patchUser({ id, inputEmail })
			if (data) {
				toast.success("Вы успешно изменили email!")
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error)
		}
	}

	// Friends

	const friendsLoader = async () => {
		const data = await FriendsService.loaderFriend()
		setFriends(data)
	}

	const addFriendHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const users = await UserService.getAllUsers()
			const data = async () => {
				return await FriendsService.addFriend({ email: friendId })
			}
			users.forEach((user: IResponseUser) => {
				if (user.email === friendId) {
					data()
					toast.success("Вы добавили друга!")
					friendsLoader()
				}
				setFriendId("")
			})
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error)
		}
	}

	useEffect(() => {
		textLoader()
		friendsLoader()
	}, [])

	return (
		<div>
			<Header />
			<ProtectedRoute>
				<main className={styles.main}>
					<div className={container.container}>
						<div className={styles.main__grid}>
							<div className={[styles.main__grid_block, styles["list-form"]].join(" ")}>
								<form onSubmit={formTextHandler}>
									<div className={styles.main__grid_form}>
										<input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Доброе дело" className={styles.input} />
										<button className={[styles["btn-green"], styles.big].join(" ")}>Добавить доброе дело</button>
									</div>
								</form>
								<div className={styles["wrapper-list"]}>
									<h3 className={styles["wrapper-list__title"]}>Твои добрые дела</h3>
									<ol className={styles["wrapper-list__list"]}>
										{deeds.map((text, index) => (
											<li key={index} className={styles["wrapper-list__list_item"]}>
												<div className={styles["wrapper-list__list_text"]}>
													<p>{index + 1}.</p>
													{input == false ? <p>{text.text}</p> : <input type="text" value={changeText} onChange={e => setChangeText(e.target.value)} placeholder="Измените дело" className={styles.input__patch} />}
												</div>
												<div className={styles["wrapper-list__list_control"]}>
													{input == false ? (
														<button onClick={() => setInput(true)} className={[styles["btn-green"], styles.small].join(" ")}>
															Редактировать
														</button>
													) : (
														<button onClick={() => patchTextHandler({ id: text.id, inputText: changeText })} className={[styles["btn-green"], styles.small].join(" ")}>
															Сохранить
														</button>
													)}
													<button type="submit" onClick={() => deleteTextHandler(text.id)} className={[styles["btn-red"], styles.small].join(" ")}>
														Удалить
													</button>
												</div>
											</li>
										))}
									</ol>
								</div>
							</div>
							<div className={[styles.main__grid_block, styles["friends-list"]].join(" ")}>
								<div className={styles["wrapper-list"]}>
									<h3 className={styles["wrapper-list__title"]}>Нажми на друга</h3>
									<ol className={[styles["wrapper-list__list"], styles.mini].join(" ")}>
										<li className={styles["wrapper-list__list_item"]}>Помог бабушке</li>
									</ol>
								</div>
							</div>
							<div className={[styles.main__grid_block, styles["friends-accounts"]].join(" ")}>
								<div className={styles.friends}>
									<h2>Друзья</h2>
									<ul className={styles.friends__list}>
										{friends.map((friend, index) => (
											<li key={index} className={styles.friends__list_item}>
												{friend.email}
											</li>
										))}
									</ul>
									<form onSubmit={addFriendHandler} className={styles["friends-form"]}>
										<input type="text" value={friendId} onChange={e => setFriendId(e.target.value)} placeholder="Email друга" className={styles.input} />
										<button className={styles["btn-green"]}>Добавить друга</button>
									</form>
								</div>
							</div>
							<div className={[styles.main__grid_block, styles["edit-account"]].join(" ")}>
								<div className={styles.account}>
									<h2>Изменить почту</h2>
									<div className={styles.account__form}>
										<input value={changeEmail} onChange={e => setChangeEmail(e.target.value)} type="text" placeholder="Email" className={styles.input} />
										<button
											onClick={() => {
												patchUserHandler({ inputEmail: changeEmail })
												logoutUserHandler("Войдите с новым email")
											}}
											className={styles["btn-green"]}>
											Изменить
										</button>
									</div>
									<button
										onClick={() => {
											deleteUserHandler()
											logoutUserHandler("Вы успешно удалили свой аккаунт!")
										}}
										className={styles["btn-red"]}>
										Удалить аккаунт
									</button>
								</div>
							</div>
						</div>
					</div>
				</main>
			</ProtectedRoute>
		</div>
	)
}
