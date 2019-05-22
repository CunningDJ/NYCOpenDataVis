import * as React from 'react';


export interface IBodyCellProps {
    content: any
}

const BodyCell = (props: IBodyCellProps) => (
    <td className="BodyCell">
        {props.content}
    </td>
);


export default BodyCell;