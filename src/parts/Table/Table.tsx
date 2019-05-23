import * as React from 'react';

import HeadCell from './HeadCell';
import BodyCell from './BodyCell';
import { IDataRow } from '../Api/Api.d';

import './Table.css';

export interface ITableProps {
    colIds: string[],         // table header strings
    colIdToNameMap: {    // table column ids -> user-friendly names
        [ id: string]: string
    },
    data: IDataRow[]
}

export interface ITableState {
    colIds: string[],         // table header names
    colIdToNameMap: {    // table column ids -> user-friendly names
        [ id: string]: string
    },
    data: IDataRow[],
    sortColId: string | null,
    sortAscending: boolean,    // false=descending
    displayData: number[]
}

export default class Table extends React.Component<ITableProps, ITableState> {
    public constructor(props: ITableProps) {
        super(props);

        // default: all indices
        const displayData = props.data.map((data, idx) => idx)

        this.state = {
            colIds: props.colIds,
            colIdToNameMap: props.colIdToNameMap,
            data: props.data,
            sortColId: null,
            sortAscending: true,
            displayData
        }

        this.renderTHead = this.renderTHead.bind(this);
        this.renderTBody = this.renderTBody.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.clickHeadCell = this.clickHeadCell.bind(this);
    }

    private renderTHead(colIds: string[]) {
        return (
            <thead className="Table__head">
                <tr className="Table__head__row">
                {
                    colIds
                        .map((id, colIdx) => {
                            let sortCaret = null;
                            if (id === this.state.sortColId) {
                                sortCaret = this.state.sortAscending;
                            }
                            return (
                                <HeadCell
                                    key={`header-${colIdx}`}
                                    name={this.state.colIdToNameMap[id]}
                                    onClick={this.clickHeadCell}
                                    sortCaret={sortCaret}
                                />
                            )
                        })
                }
                </tr>
            </thead>
        )
    }

    private renderTBody(dataRows: IDataRow[]) {
        return (
            <tbody className="Table__body">
                {
                    dataRows.map(this.renderRow)
                }
            </tbody>
        )
    }

    private renderRow(dataRow: IDataRow, rowIdx: number) {
        return     (
            <tr key={`row-${rowIdx}`} className="Table__body__row">
                {
                    this.state.colIds
                            .map((colId, colIdx) => {
                                return (
                                    <BodyCell
                                        key={`${rowIdx}-${colIdx}`}
                                        content={dataRow[colId]}
                                    />
                                )
                            }) 
                }
            </tr>
            )
    }

    private clickHeadCell(e: React.MouseEvent<HTMLTableHeaderCellElement>) {
        const colIdToSort = this.state.colIds[e.currentTarget.cellIndex];
        const justClicked = (colIdToSort === this.state.sortColId);
        console.log('a')
        // toggles if same header was clicked last
        if (justClicked) {
            this.setState({
                sortAscending: !this.state.sortAscending,
                // just reverse what was already done
                displayData: this.state.displayData.concat().reverse()
            })
        } else {
            const newDisplayData = this.sortDisplayData(colIdToSort, true);
            this.setState({
                displayData: newDisplayData,
                sortColId: colIdToSort,
                sortAscending: true
            })
        }
    }

    private sortDisplayData(colId: string, sortAscending: boolean): number[] {
        const { data, displayData } = this.state;
        if (displayData.length === 0) {
            return []
        }
        return displayData.concat()
                    .sort((aIdx, bIdx) => {
                        const aRow = data[aIdx], aCell = aRow[colId]; 
                        const bRow = data[bIdx], bCell = bRow[colId];
                        if (typeof aRow[colId] === "string") {
                            if (sortAscending) {
                                return (aCell as string)
                                        .localeCompare(bCell as string)
                            } else {
                                return (bCell as string)
                                        .localeCompare(aCell as string)
                            }
                            
                        } else {
                            if (sortAscending) {
                                return (aCell as any) - (bCell as any);
                            } else {
                                return (bCell as any) - (aCell as any);
                            }
                        }
                    })
    }

    public render() {

        return (
            <table className="Table">
                {this.renderTHead(this.state.colIds)}
                {this.renderTBody(this.state.displayData.map(idx => this.state.data[idx]))}
            </table>
        )
    }
}