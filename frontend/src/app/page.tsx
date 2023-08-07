import Link from "next/link"
import styles from "@/styles/app.module.scss"
import container from "@/styles/container.module.scss"
import { Header } from "@/components/Header"

export default function Home() {
	return (
		<div>
			<Header />
			<main className={styles.main}>
				<div className={container.container}>
					<div className={styles.window}>
						<div className={styles.window__inner}>
							<h2 className={styles.main__title}>Добавь в список свои добрые дела</h2>
							<Link href="/auth" className={styles["btn-green"]}>
								Авторизоваться
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
