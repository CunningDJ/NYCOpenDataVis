import * as React from 'react';
import { Helmet } from 'react-helmet';

import HeadCell from './HeadCell';
import BodyCell from './BodyCell';
import { IDataRow } from '../Api/Api.d';

import * as mu from '../../metaUtils';

import './Table.css';

export interface ITableProps {
    colIds: string[],         // table header strings
    colIdToNameMap: {    // table column ids -> user-friendly names
        [ id: string]: string
    },
    searchBar: boolean,
    pageFetch: (limit: number, offset: number) 
                    => Promise<IDataRow[]>,
    pageSize: number
}

export interface ITableState {
    colIds: string[],         // table header names
    colIdToNameMap: {    // table column ids -> user-friendly names
        [ id: string]: string
    },
    data: IDataRow[],
    sortColId: string | null,
    sortAscending: boolean,    // false=descending
    searchResults: number[],
    searchBar: boolean,
    searchQuery: string,
    loadError: string
}

export default class Table extends React.Component<ITableProps, ITableState> {
    public constructor(props: ITableProps) {
        super(props);

        this.state = {
            colIds: props.colIds,
            colIdToNameMap: props.colIdToNameMap,
            data: [],
            sortColId: null,
            sortAscending: true,
            searchResults: [],
            searchBar: props.searchBar,
            searchQuery: "",
            loadError: "Loading..."
        }

        this.renderTHead = this.renderTHead.bind(this);
        this.renderTBody = this.renderTBody.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.clickHeadCell = this.clickHeadCell.bind(this);
        this.sortSearchResults = this.sortSearchResults.bind(this);
        this.changeSearchQuery = this.changeSearchQuery.bind(this);
    }

    public componentDidMount() {
        this.props.pageFetch(this.props.pageSize, 0)
                .then((data) => {
                    this.setState({
                        data,
                        searchResults: data.map((data, idx) => idx)
                    })
                })
                .catch(err => {
                    this.setState({
                        loadError: "Sorry, there's a problem: " + err.message.trim()
                    })
                })
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
        return (
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
        // toggles if same header was clicked last
        if (justClicked) {
            this.setState({
                sortAscending: !this.state.sortAscending,
                // just reverse what was already done
                searchResults: this.state.searchResults.concat().reverse()
            })
        } else {
            const newSearchResults = this.sortSearchResults(colIdToSort, true);
            this.setState({
                searchResults: newSearchResults,
                sortColId: colIdToSort,
                sortAscending: true
            })
        }
    }

    private sortSearchResults(colId: string, sortAscending: boolean): number[] {
        const { data, searchResults } = this.state;
        if (searchResults.length === 0) {
            return []
        }
        return searchResults.concat()
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

    private changeSearchQuery(e: React.FormEvent<HTMLInputElement>) {
        const newQuery = e.currentTarget.value;
        this.setState({
            searchQuery: newQuery
        })
    }

    public render() {
        const { data, loadError } = this.state;
        return !(data.length == 0 && loadError != "") ? (
            <div>
                <div className="Table__search-bar">
                    <input 
                        type="text" 
                        value={this.state.searchQuery} 
                        onChange={this.changeSearchQuery}
                    />
                </div>
                <table className="Table">
                    {this.renderTHead(this.state.colIds)}
                    {this.renderTBody(this.state.searchResults.map(idx => this.state.data[idx]))}
                </table>
            </div>
        ) 
            :
        (
            <div className="nyc-complaints-table__error-box">
                <Helmet>
                    {mu.metaTitleTags(this.state.loadError)}
                </Helmet>
                <div>
                    <h3>{this.state.loadError}</h3>
                </div>
            </div>
        )
    }
}