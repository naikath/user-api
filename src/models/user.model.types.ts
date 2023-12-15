export type ResultModelObject =
	| {
			success: true
	  }
	| {
			success: false
			error: string
	  }

export type ResultModel = Promise<ResultModelObject>
