export class CreateSalesDto {
	clientName: string

	itemQuantityPairs: ItemQuantityPair[]
}

export class ItemQuantityPair {
	itemId: number

	quantity: number
}
