import React, {useMemo} from "react";
import {DatePicker, Form, Input, InputNumber, Radio} from "antd";
import {TableCellInputsType, TableDataType} from "../../types/TableTypes";
import {DATE_FORMAT} from "../../helpers/constants";
import {EnumActionType} from "../../helpers/enums";
import dayjs from "dayjs";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    isEditing: boolean;
    dataIndex: string;
    inputType: TableCellInputsType;
    data: TableDataType;
    children: React.ReactNode;
}

export const TableCell: React.FC<EditableCellProps> =
    ({
         isEditing,
         dataIndex,
         inputType,
         data,
         children,
         ...restProps
     }) => {

        const inputComponent = useMemo(() => {{
            switch (inputType) {
                case "date": {
                    return <DatePicker format={DATE_FORMAT}  />
                }
                case "number": {
                    return <InputNumber min={0}/>
                }
                case "radio": {
                    return <Radio.Group>
                        <Radio.Button value={EnumActionType.INCOME}>income</Radio.Button>
                        <Radio.Button value={EnumActionType.EXPENSE}>expense</Radio.Button>
                    </Radio.Group>
                }
                case "text": {
                    return <Input/>
                }
                default: {
                    return <Input/>
                }
            }
        }}, [inputType, isEditing])

        return (
            <td {...restProps}>
                {isEditing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{margin: 0}}
                    >
                        {inputComponent}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
