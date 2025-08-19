export type Apartment = {
	id: string
	unitName: string
	unitNumber: string
	project: string
	type?: string
	description?: string | null
	bedrooms?: number
	bathrooms?: number
	areaSqm?: number | null
	priceUsd?: string | null
	images: string[]
}

export type Project = {
	id: string
	name: string
	location: string
	developer: string
	description?: string
	startingPriceUsd?: string
	resalePriceUsdEstimated?: string
	image?: string
	apartments: Apartment[]
}

export { }