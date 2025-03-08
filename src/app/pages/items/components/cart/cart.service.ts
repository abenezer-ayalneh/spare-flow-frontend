import { Injectable, signal } from '@angular/core'
import { AdjustmentType, CartItem } from './types/cart-item.type'
import { ShelfItemForTable } from '../../types/item-list.type'
import { HttpClient } from '@angular/common/http'
import { CreateSalesDto } from './dto/create-sales.dto'

@Injectable({
	providedIn: 'root',
})
export class CartService {
	cartItems = signal<CartItem[]>([])

	constructor(private readonly httpClient: HttpClient) {}

	addToCart(shelfItem: ShelfItemForTable, quantity = 1) {
		const currentItems = this.cartItems()

		const cartItem = currentItems.find((item) => item.id === shelfItem.id)
		if (cartItem) {
			this.adjustQuantity(shelfItem, AdjustmentType.INCREMENT, quantity)
		} else {
			currentItems.push({
				id: shelfItem.id,
				shelfItemForTable: shelfItem,
				quantity,
				selected: true,
			})
		}

		this.cartItems.set(currentItems)
	}

	removeFromCart(cartItemIds: number[]) {
		this.cartItems.update((cartItems) => cartItems.filter((item) => !cartItemIds.includes(item.id)))
	}

	adjustQuantity(shelfItem: ShelfItemForTable, adjustmentType: AdjustmentType, quantity = 1) {
		this.cartItems.update((cartItems) => {
			const cartItem = cartItems.find((item) => item.id === shelfItem.id)
			if (cartItem) {
				let newQuantity = cartItem.quantity
				// For increment, check
				if (adjustmentType === AdjustmentType.INCREMENT && shelfItem.quantity >= cartItem.quantity + quantity) {
					newQuantity = cartItem.quantity + quantity
				} else if (adjustmentType === AdjustmentType.DECREMENT) {
					if (cartItem.quantity - quantity > 0) {
						newQuantity = cartItem.quantity - quantity
					} else {
						return cartItems.filter((item) => item.id !== shelfItem.id)
					}
				}

				return cartItems.map((item) => (item.id === cartItem.id ? { ...cartItem, quantity: newQuantity } : item))
			}

			return cartItems
		})
	}

	setItemsSelectionValue(cartItemIds: number[], selectionValue: boolean) {
		this.cartItems.update((cartItems) => cartItems.map((item) => ({ ...item, selected: cartItemIds.includes(item.id) ? selectionValue : item.selected })))
	}

	sellSelectedItemsInTheCart(createSalesDto: CreateSalesDto) {
		return this.httpClient.post<boolean>(`sales`, createSalesDto)
	}
}
