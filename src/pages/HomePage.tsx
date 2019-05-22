import * as React from 'react';

import NycComplaintsTable from '../parts/NycComplaintsTable/NycComplaintsTable';

export interface IHomePageProps {}

const HomePage = (props: IHomePageProps) => (
    <div>
        <h1>NYC Complaints Data</h1>
        <NycComplaintsTable />
    </div>
)

export default HomePage;