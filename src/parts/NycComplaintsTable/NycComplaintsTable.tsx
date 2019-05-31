import * as React from 'react';

import Table from '../Table/Table';
import * as ApiNYCC from '../Api/ApiNYCC';
import { limitOffsetCfg } from '../Api/ApiOpenData';
import { INycComplaintDataRow } from '../Api/Api.d'

import './NycComplaintsTable.css'

export interface INYCCTableProps {}

export interface INYCCTableState {
    colIds: string[],         // table header names
    colIdToNameMap: {    // table column ids -> user-friendly names
        [ id: string]: string
    }
}

const DEFAULT_COLIDS = Object.values(ApiNYCC.COL);


export default class NYCCTable extends React.Component<INYCCTableProps, INYCCTableState> {
    public constructor(props: INYCCTableProps) {
        super(props)

        this.state = {
            colIds: DEFAULT_COLIDS,
            colIdToNameMap: ApiNYCC.COL_IDTONAME_MAP
        }

        this.pageFetch = this.pageFetch.bind(this);
    }

    public pageFetch(limit: number, offset: number) {
        return new Promise((resolve, reject) => {
            ApiNYCC.fetchData(limitOffsetCfg(limit, offset))
                .then(({ data }) => resolve(Object.values(data)))
                .catch(err => reject(err))
        }) as Promise<INycComplaintDataRow[]>
    }

    public render() {
        const { colIds, colIdToNameMap } = this.state;
        return (
            <div className="nyc-complaints-table">
                <Table
                    colIds={colIds}
                    colIdToNameMap={colIdToNameMap}
                    searchBar={true}
                    pageFetch={this.pageFetch}
                    pageSize={50}
                />
            </div>
        );
    }
}