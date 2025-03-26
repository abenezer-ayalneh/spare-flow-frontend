import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TransactionLogResponse } from './types/transaction-log-table.type'

@Injectable({
	providedIn: 'root',
})
export class TransactionLogService {
	constructor(private readonly httpClient: HttpClient) {}

	getTransactions() {
		return this.httpClient.get<TransactionLogResponse[]>('transaction-log')
	}
}
