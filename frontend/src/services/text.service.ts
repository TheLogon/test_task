import { instance } from "@/api/axios.api"
import { IResponseText, IText } from "@/types/types"

export const TextService = {
	async addText(textData: IText) {
		const { data } = await instance.post("/lists", textData)
		return data
	},
	async loaderText() {
		const { data } = await instance.get("/lists")
		return data
	},
	async deleteText({ id }: { id: any }) {
		const { data } = await instance.delete(`/lists/${id}`)
		if (data) return data
	},
}
