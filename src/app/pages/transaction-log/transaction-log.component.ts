import { Component, OnInit } from '@angular/core'
import { FeatherModule } from 'angular-feather'
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card'
import { TranslatePipe } from '@ngx-translate/core'
import { MatFormField } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable,
	MatTableDataSource,
} from '@angular/material/table'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { TransactionLogForTable, TransactionLogResponse } from './types/transaction-log-table.type'
import { DatePipe, NgClass } from '@angular/common'
import { TransactionLogService } from './transaction-log.service'
import { TransactionType } from '../../shared/models/transaction-log.model'

@Component({
	selector: 'app-transaction-log',
	standalone: true,
	imports: [
		FeatherModule,
		MatCard,
		MatCardContent,
		TranslatePipe,
		MatCardTitle,
		MatFormField,
		MatInput,
		MatCell,
		MatTable,
		MatSort,
		MatHeaderCell,
		MatHeaderCellDef,
		MatColumnDef,
		MatCellDef,
		MatHeaderRow,
		MatRow,
		MatHeaderRowDef,
		MatRowDef,
		MatPaginator,
		MatSortHeader,
		DatePipe,
		NgClass,
	],
	templateUrl: './transaction-log.component.html',
	styleUrl: './transaction-log.component.scss',
})
export class TransactionLogComponent implements OnInit {
	dataSource: MatTableDataSource<TransactionLogForTable>

	displayedColumns: string[] = ['time', 'username', 'itemName', 'partNumber', 'price', 'type', 'quantity', 'remainingQuantity', 'source']
	protected readonly TransactionType = TransactionType

	constructor(private readonly transactionLogService: TransactionLogService) {}

	ngOnInit() {
		this.transactionLogService.getTransactions().subscribe({
			next: (transactionLogs) => {
				this.dataSource = new MatTableDataSource(transactionLogs.map((transactionLog) => this.convertTransactionLogResponseToTableData(transactionLog)))
			},
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value
		this.dataSource.filter = filterValue.trim().toLowerCase()
	}

	convertTransactionLogResponseToTableData(transactionLog: TransactionLogResponse): TransactionLogForTable {
		return {
			id: transactionLog.id,
			time: transactionLog.createdAt,
			username: transactionLog.ResponsibleUser.username,
			itemName: transactionLog.Item.name,
			partNumber: transactionLog.Item.partNumber,
			price: transactionLog.Item.price,
			type: transactionLog.type,
			quantity: transactionLog.quantity,
			remainingQuantity: transactionLog.remainingQuantity,
			source: transactionLog.Item.source,
		}
	}
}
