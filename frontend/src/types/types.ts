export interface IUser {
	id: number
	email: string
	token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponseUser {
	email: string
	id: number
	createdAt: string
	updatedAt: string
	password: string
}

export interface IResponseUserData {
	token: string
	user: IResponseUser
}

export interface IText {
	text: string
}

export interface IResponseText {
	text: string
	id: number
	createdAt: string
	updatedAt: string
}
export interface IResponseTextData {
	id: number
	inputText: string
}
export interface IResponseEmailData {
	id: number | undefined
	inputEmail: string
}

export interface IFriend {
	email: string
}

export interface IResponseFriend {
	email: string
	id: number
	createdAt: string
	updatedAt: string
	user_id: number
}
