import * as React from 'react';


export interface ICellProps {
    header?: boolean,
    content: any
}

const Cell = (props: ICellProps) => {
    return props.header ? 
        (<th className="Cell">
            {props.content}
        </th>) 
        : 
        (<td className="Cell">
            {props.content}
        </td>);
}

export default Cell;