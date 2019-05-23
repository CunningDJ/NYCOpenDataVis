import * as React from 'react';


export interface IHeadCellProps {
    name: any,
    onClick(e: React.MouseEvent<HTMLTableHeaderCellElement>): void;
}

const HeadCell = (props: IHeadCellProps) =>(
    <th className="HeadCell" onClick={props.onClick}>
            {props.name}
    </th>
);


export default HeadCell;