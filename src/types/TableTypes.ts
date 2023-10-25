import {Key} from "react";
import {EnumActionType} from "../helpers/enums";

export type TableDataType = {
    key: Key,
    date: string,
    amount: number,
    type: EnumActionType,
    note: string,
    isNew?: boolean
}

export type TableCellInputsType = 'date' | 'number' | 'radio' | 'text'
