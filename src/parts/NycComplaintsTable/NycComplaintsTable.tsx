import * as React from 'react';

import Table from '../Table/Table';

import * as ApiNYCC from '../Api/ApiNYCC';
import { INycComplaintDataRow } from '../Api/Api.d'

export interface INYCCTableProps {}

export interface INYCCTableState {
    colIds: string[],         // table header names
    colIdToNameMap: {    // table column ids -> user-friendly names
        [ id: string]: string
    },
    bodyData: INycComplaintDataRow[] | null,
    loadError: string
}

const DEFAULT_COLIDS = Object.values(ApiNYCC.COL);


export default class NYCCTable extends React.Component<INYCCTableProps, INYCCTableState> {
    public constructor(props: INYCCTableProps) {
        super(props)

        this.state = {
            colIds: DEFAULT_COLIDS,
            colIdToNameMap: ApiNYCC.COL_IDTONAME_MAP,
            bodyData: null,
            loadError: "Loading..."
        }
    }

    public componentDidMount() {
        ApiNYCC.fetchData()
            .then(({ data }) => {
                this.setState({
                    bodyData: Object.values(data)
                })
            })
            .catch((err) => {
                this.setState({
                    loadError: err
                });
            })
    }

    public render() {
        const { bodyData, colIds, colIdToNameMap } = this.state;
        //const castBodyData = (<IDataRow[]>) bodyData;
        return bodyData ? 
        (
            <Table 
                bodyData={bodyData} 
                colIds={colIds} 
                colIdToNameMap={colIdToNameMap}
            />
        ) :
        (
            <div>
                <h3>{this.state.loadError}</h3>
            </div>
        )
    }
}