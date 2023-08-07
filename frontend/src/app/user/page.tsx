"use client"
import Link from "next/link"
import styles from "@/styles/app.module.scss"
import container from "@/styles/container.module.scss"
import { Header } from "@/components/Header"
import { ProtectedRoute } from "../ProtectedRoute"
import { instance } from "@/api/axios.api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TextService } from "@/services/text.service"
import { IResponseText } from "@/types/types"

// export const listAction = async ({ request }: any) => {
// 	switch (request.method) {
// 		case "POST": {
// 			const formData = await request.formData()
// 			const text = {
// 				text: formData.get("text"),
// 			}
// 			await instance.post("/lists", text)
// 			return null
// 		}
// 		case "PATCH": {
// 			return null
// 		}
// 		case "DELETE": {
// 			return null
// 		}
// 	}
// }

export default function User() {
	const [text, setText] = useState("")
	const [deeds, setDeeds] = useState([])

	const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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

	const deleteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const id = e.target[0].value

			const data = await TextService.deleteText({ id })
			if (data) {
				toast.success("Вы удалили дело!")
				textLoader()
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error)
		}
	}

	useEffect(() => {
		textLoader()
	}, [])

	return (
		<div>
			<Header />
			<ProtectedRoute>
				<main className={styles.main}>
					<div className={container.container}>
						<div className={styles.main__grid}>
							<div className={[styles.main__grid_block, styles["list-form"]].join(" ")}>
								<form onSubmit={formHandler}>
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
													<p>{text.text}</p>
												</div>
												<form onSubmit={deleteHandler}>
													<input type="hidden" name="id" value={text.id} />
													<div className={styles["wrapper-list__list_control"]}>
														<button className={[styles["btn-green"], styles.small].join(" ")}>Редактировать</button>
														<button type="submit" className={[styles["btn-red"], styles.small].join(" ")}>
															Удалить
														</button>
													</div>
												</form>
											</li>
										))}
									</ol>
								</div>
							</div>
							<div className={[styles.main__grid_block, styles["friends-list"]].join(" ")}>
								<div className={styles["wrapper-list"]}>
									<h3 className={styles["wrapper-list__title"]}>Нажми на друга</h3>
									<ol className={styles["wrapper-list__list"]}>
										<li className={styles["wrapper-list__list_item"]}>Помог бабушке</li>
									</ol>
								</div>
							</div>
							<div className={[styles.main__grid_block, styles["friends-accounts"]].join(" ")}>
								<div className={styles.friends}>
									<h2>Друзья</h2>
									<ul className={styles.friends__list}>
										<li className={styles.friends__list_item}>demin0524@gmail.com</li>
										<li className={styles.friends__list_item}>kirilld539@gmail.com</li>
									</ul>
									<button className={styles["btn-green"]}>Добавить друга</button>
								</div>
							</div>
							<div className={[styles.main__grid_block, styles["edit-account"]].join(" ")}>
								<div className={styles.account}>
									<h2>Изменить почту</h2>
									<div className={styles.account__form}>
										<input type="text" placeholder="Email" className={styles.input} />
										<button className={styles["btn-green"]}>Изменить</button>
									</div>
									<button className={styles["btn-red"]}>Удалить аккаунт</button>
								</div>
							</div>
						</div>
					</div>
				</main>
			</ProtectedRoute>
		</div>
	)
}
