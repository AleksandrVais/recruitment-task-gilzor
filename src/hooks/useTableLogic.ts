import {Form} from "antd";
import {Key, useEffect, useState} from "react";
import { TableDataType} from "../types/TableTypes";
import dayjs from "dayjs";
import {EnumActionType} from "../helpers/enums";
import {LOCAL_STORAGE_KEY} from "../helpers/constants";

export const useTableLogic = () => {
    const [form] = Form.useForm();

    const [tableData, setTableData] = useState<TableDataType[]>([])
    const [editingRowKey, setEditingRowKey] = useState<Key>("")

    useEffect(() => {
        const JsonFromLS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]');
        const parsedJsonData = JsonFromLS.filter((el: TableDataType) => !el.isNew);

        if(JsonFromLS.length !== parsedJsonData.length) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedJsonData))
        }

        setTableData(parsedJsonData)

    }, [])

    const onSaveTableDataWithLS = (value: TableDataType[]) => {
        setTableData(value);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
    }

    const onDeleteRow = (key: Key) => {
        const filteredTableData = tableData.filter(el => el.key !== key)
        onSaveTableDataWithLS(filteredTableData);
    };

    const onEditRow = (row: TableDataType) => {
        setEditingRowKey(row.key)
        form.setFieldsValue({...row, date: dayjs(row.date)});
    }

    const onAcceptChanges = () => {
        const newData = form.getFieldsValue();

        const updatedTableData = tableData.map(el => {
            if (editingRowKey !== el.key) return el

            delete el.isNew
            return {...el, ...newData, date: newData.date.toJSON()}
        })
        onSaveTableDataWithLS(updatedTableData)

        setEditingRowKey("")
    }

    const onDiscardChanges = () => {
        setEditingRowKey("")
    }

    const onAddRow = () => {
        const newData: TableDataType = {
            key: Date.now().toString(),
            date: dayjs().toJSON(),
            amount: 0,
            type: EnumActionType.INCOME,
            note: '',
            isNew: true
        };

        onSaveTableDataWithLS([...tableData, newData]);
        onEditRow(newData)
    };

    return {
        form,
        tableData,
        onDeleteRow,
        onAcceptChanges,
        onDiscardChanges,
        onAddRow,
        onEditRow,
        editingRowKey
    }

}
