import * as React from 'react';


export interface ICellProps {
    header?: boolean,
    content: any
}

const Cell = (props: ICellProps) => {
    return props.header ? 
        (<th className="Cell__head">
            {props.content}
        </th>) 
        : 
        (<td className="Cell__body">
            {props.content}
        </td>);
}

export default Cell;