// Success Result

export type ResultObjectSuccess = {
	success: true
}

export type ResultPromiseSuccess = Promise<ResultObjectSuccess>

// Error Result

export type ResultObjectError = {
	success: false
	error: string
}

export type ResultPromiseError = Promise<ResultObjectError>

// Common Result

export type ResultObjectCommon = ResultObjectSuccess | ResultObjectError

export type ResultPromiseCommon = Promise<ResultObjectCommon>

// Model Result

export type ResultModel = ResultPromiseCommon
