import * as React from 'react';


export interface IHeadCellProps {
    content: any
}

const HeadCell = (props: IHeadCellProps) =>(
    <th className="HeadCell">
            {props.content}
    </th>
);


export default HeadCell;