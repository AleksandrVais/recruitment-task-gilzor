import {FC, useMemo} from "react";
import {TableDataType} from "../../types/TableTypes";
import {Flex} from "antd";
import {EnumActionType} from "../../helpers/enums";

type FooterPropsType = {
    tableData: readonly TableDataType[]
}

export const Footer: FC<FooterPropsType> = ({tableData}) => {
    const calculatedAmount = useMemo(() => tableData.reduce((acc, transaction) => {
        const {amount, type} = transaction;
        const valueForCalculation = type === EnumActionType.EXPENSE ? amount * -1 : amount;

        return acc + valueForCalculation
    }, 0), [tableData])

    return <Flex justify={'space-between'}>
        <span>Total</span>
        <span>{calculatedAmount}$</span>
    </Flex>
}
