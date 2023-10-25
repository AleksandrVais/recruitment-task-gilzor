import {TableCellInputsType} from "../types/TableTypes";

export const DATE_FORMAT = 'DD/MM/YYYY'

export const columnInputs: Record<string, TableCellInputsType> = {
    date: 'date',
    amount: 'number',
    type: 'radio',
    note: 'text'
}

export const LOCAL_STORAGE_KEY = 'recr_task_gilzor'
