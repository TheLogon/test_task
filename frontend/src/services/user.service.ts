import { instance } from "@/api/axios.api"
import { IResponseEmailData } from "@/types/types"

export const UserService = {
	async deleteUser(id: number | undefined) {
		const { data } = await instance.delete(`/user/${id}`)
		if (data) return data
	},
	async patchUser({ id, inputEmail }: IResponseEmailData) {
		const user = {
			id: id,
			email: inputEmail,
		}
		const { data } = await instance.patch(`/user/${id}`, user)
		if (data) return data
	},
	async getAllUsers() {
		const { data } = await instance.get(`/user`)
		if (data) return data
	},
}
