import * as React from 'react';

import Cell from './Cell';
import { IDataRow } from '../Api/Api.d';

export interface ITableProps {
    colIds: string[],         // table header strings
    colIdToNameMap: {    // table column ids -> user-friendly names
        [ id: string]: string
    },
    bodyData: IDataRow[]
}

export interface ITableState {
    colIds: string[],         // table header names
    colIdToNameMap: {    // table column ids -> user-friendly names
        [ id: string]: string
    },
    bodyData: IDataRow[]    
}

export default class Table extends React.Component<ITableProps, ITableState> {
    public constructor(props: ITableProps) {
        super(props);

        this.state = {
            colIds: props.colIds,
            colIdToNameMap: props.colIdToNameMap,
            bodyData: props.bodyData
        }

        this.renderTHead = this.renderTHead.bind(this);
        this.renderTBody = this.renderTBody.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    private renderTHead(colIds: string[]) {
        return (
            <thead className="Table__head">
                <tr>
                {
                    colIds
                        .map((id, colIdx) => {
                            return (
                                <Cell
                                    key={`header-${colIdx}`}
                                    content={this.state.colIdToNameMap[id]}
                                    header={true}
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
            <tr key={`row-${rowIdx}`}>
                {
                    this.state.colIds
                            .map((colId, colIdx) => {
                                return (
                                    <Cell
                                        key={`${rowIdx}-${colIdx}`}
                                        content={dataRow[colId]}
                                    />
                                )
                            }) 
                }
            </tr>
            )
    }

    public render() {
        return (
            <table className="Table">
                {this.renderTHead(this.state.colIds)}
                {this.renderTBody(this.state.bodyData)}
            </table>
        )
    }
}