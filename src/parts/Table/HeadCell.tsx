import * as React from 'react';


export interface IHeadCellProps {
    name: any,
    onClick(e: React.MouseEvent<HTMLTableHeaderCellElement>): void;
    sortCaret: boolean | null;    // boolean=ascending/descending
}

const HeadCell = (props: IHeadCellProps) =>(
    <th className="HeadCell" onClick={props.onClick}>
        <span className="HeadCell__name">
            {props.name}
        </span>
        <SortCaret caret={props.sortCaret} />
    </th>
);


interface ISortCaretProps {
    caret: boolean | null
}

const SortCaret = (props: ISortCaretProps) => {
    let iconClass = ""
    if (props.caret !== null) {
        iconClass = props.caret ? "fas fa-angle-up" : "fas fa-angle-down";
    }
    return (
        <span className="HeadCell__sort-caret">
            <i className={iconClass}></i>
        </span>
    );
}


export default HeadCell;