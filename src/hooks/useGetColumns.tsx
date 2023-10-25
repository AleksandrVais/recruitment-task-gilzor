import {Key} from "react";
import {ActionButton} from "../components/ActionButton";
import {TableDataType} from "../types/TableTypes";
import {EnumActionType} from "../helpers/enums";
import dayjs from "dayjs";
import {DATE_FORMAT} from "../helpers/constants";

const {EXPENSE} = EnumActionType

export const useGetColumns =
    (
     onDeleteRow: (key: Key) => void,
     onAcceptChanges: () => void,
     onDiscardChanges: () => void,
     setEditingRowKey: (row: TableDataType) => void,
     editingRowKey: Key
    ) => {
        return [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                editable: true,
                sorter: ({date: firstDate}: TableDataType, {date: secondDate}: TableDataType) => dayjs(firstDate).isAfter(secondDate) ? -1 : 1,
                render: (text: string, record: TableDataType) => dayjs(record.date).format(DATE_FORMAT)
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                editable: true,
                render: (text: string, {
                    type,
                    amount
                }: TableDataType) => `${type === EXPENSE && amount !== 0 ? '-' : ''}${text}$`,
                sorter: ({amount: firstAmount, type: firstType}: TableDataType, {
                    amount: secondAmount,
                    type: secondType
                }: TableDataType) => {
                    const firstParsedAmount = firstType === EXPENSE ? firstAmount * -1 : firstAmount
                    const secondParsedAmount = secondType === EXPENSE ? secondAmount * -1 : secondAmount

                    return firstParsedAmount - secondParsedAmount;
                }
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                editable: true,
                showSorterTooltip: false,
                sorter: (a: TableDataType, b: TableDataType) => a.type === b.type ? 1 : -1
            },
            {
                title: 'Note',
                dataIndex: 'note',
                key: 'note',
                editable: true,
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                width: 40,
                render: (_: string, data: TableDataType) => {
                    return <ActionButton
                        data={data}
                        onDelete={onDeleteRow}
                        onEdit={setEditingRowKey}
                        editingRowKey={editingRowKey}
                        onAcceptChanges={onAcceptChanges}
                        onDiscardChanges={onDiscardChanges}/>
                }
            },
        ];
    }
