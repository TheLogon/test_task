import { instance } from "@/api/axios.api"
import { IResponseTextData, IText } from "@/types/types"

export const TextService = {
	async addText(textData: IText) {
		const { data } = await instance.post("/lists", textData)
		return data
	},
	async loaderText() {
		const { data } = await instance.get("/lists")
		return data
	},
	async deleteText(id: number) {
		const { data } = await instance.delete(`/lists/${id}`)
		if (data) return data
	},
	async patchText({ id, inputText }: IResponseTextData) {
		const list = {
			id: id,
			text: inputText,
		}
		const { data } = await instance.patch(`/lists/${id}`, list)
		if (data) return data
	},
}
