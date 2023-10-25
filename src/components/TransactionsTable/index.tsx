import React, {FC} from "react";
import {Button, Form, Table} from "antd";
import { TableDataType} from "../../types/TableTypes";
import {useGetColumns} from "../../hooks/useGetColumns";
import {TableCell} from "../TableCell";
import {Footer} from "../Footer";
import {useTableLogic} from "../../hooks/useTableLogic";
import {columnInputs} from "../../helpers/constants";

export const TransactionsTable: FC = () => {
    const {
        form,
        tableData,
        onDeleteRow,
        onAcceptChanges,
        onDiscardChanges,
        onAddRow,
        onEditRow,
        editingRowKey
    } = useTableLogic()

    const columns = useGetColumns(
        onDeleteRow,
        onAcceptChanges,
        onDiscardChanges,
        onEditRow,
        editingRowKey,
    )

    const formattedColumns = columns.map((column) => {
        const {dataIndex, title, editable} = column

        if (!editable) return column;

        return {
            ...column,
            onCell: (data: TableDataType) => ({
                data,
                inputType: columnInputs[dataIndex] ?? 'text',
                dataIndex,
                title,
                isEditing: data.key === editingRowKey,
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Button type="primary" style={{marginBottom: 10}} onClick={onAddRow}>Add new</Button>
            <Table
                columns={formattedColumns}
                dataSource={tableData}
                footer={(tableData) => <Footer tableData={tableData}/>}
                components={{
                    body: {
                        cell: TableCell,
                    },
                }}/>
        </Form>
    )
}
