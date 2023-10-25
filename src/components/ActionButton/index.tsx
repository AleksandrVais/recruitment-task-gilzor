import {FC, Key, useState} from "react";
import {Button, Popover, Flex} from "antd";
import {CheckOutlined, CloseOutlined, MoreOutlined} from "@ant-design/icons";
import {TableDataType} from "../../types/TableTypes";

type ActionButtonPropsType = {
    data: TableDataType
    editingRowKey: Key;
    onDelete(key: Key): void
    onEdit(row: TableDataType): void
    onAcceptChanges(): void,
    onDiscardChanges(): void,
}

export const ActionButton: FC<ActionButtonPropsType> = ({data, editingRowKey, onDelete, onEdit, onDiscardChanges, onAcceptChanges}) => {

    const [isOpen, setIsOpen] = useState(false);

    const {key: rowKey, isNew} = data
    const isEditing = rowKey === editingRowKey

    const onHandleDelete = () => {
        onDelete(rowKey)
        setIsOpen(false)
    }

    const onHandleEdit = () => {
        onEdit(data)
        setIsOpen(false)
    }

    const onHandleDiscardChanges = () => {
        if(isNew) return onHandleDelete();
        onDiscardChanges()
    }

    return <>
        {isEditing ?
            <Flex gap={10}>
                <Button onClick={onAcceptChanges} type={'text'} icon={<CheckOutlined />}/>
                <Button onClick={onHandleDiscardChanges} type={'text'} icon={<CloseOutlined />}/>
            </Flex> :
            <Popover
                open={isOpen}
                onOpenChange={setIsOpen}
                trigger={'click'}
                content={() => {
                    return (
                        <Flex vertical={true} gap={10}>
                            <Button onClick={onHandleEdit}>Edit</Button>
                            <Button onClick={onHandleDelete}>Delete</Button>
                        </Flex>)
                }}>
                <Button icon={<MoreOutlined/>} type={'text'} shape="circle"/>
            </Popover>
        }</>
}
