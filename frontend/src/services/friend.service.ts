import { instance } from "@/api/axios.api"
import { IFriend } from "@/types/types"

export const FriendsService = {
	async addFriend(friendData: IFriend) {
		const { data } = await instance.post("/friends", friendData)
		return data
	},
	async loaderFriend() {
		const { data } = await instance.get("/friends")
		return data
	},
}
