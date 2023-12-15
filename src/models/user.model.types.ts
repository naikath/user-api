// Success Result

export type ResultObjectSuccess = {
	success: true
}

export type ResultPromiseSuccess = Promise<ResultObjectSuccess>

// Error Result

export type ResultObjectError = {
	success: false
	errorCode: ErrorCode
}

export type ResultPromiseError = Promise<ResultObjectError>

// Common Result

export type ResultObjectCommon = ResultObjectSuccess | ResultObjectError

export type ResultPromiseCommon = Promise<ResultObjectCommon>

// Model Result

export type ResultModel = ResultPromiseCommon

// Error Codes

export const errorCodes = ['UNEXPECTED', 'USER_EXISTS', 'USER_NOT_EXISTS', 'LOGIN_INVALID'] as const

export type ErrorCode = (typeof errorCodes)[number]
