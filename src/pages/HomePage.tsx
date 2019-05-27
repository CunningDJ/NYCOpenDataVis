import * as React from 'react';
import { Helmet } from 'react-helmet';

import NycComplaintsTable from '../parts/NycComplaintsTable/NycComplaintsTable';

import * as mu from '../metaUtils';

// meta
const DEFAULT_META = {
    title: "NYC Complaints Data",
    description: "NYC Complaints Data from NYC OpenData.",
}

export interface IHomePageProps {}

const HomePage = (props: IHomePageProps) => (
    <div>
        <Helmet>
            {mu.metaTitleTags(DEFAULT_META.title)}
            {mu.metaDescriptionTags(DEFAULT_META.description)}
            {mu.metaUrlTags()}
        </Helmet>

        <h1>NYC Complaints Data</h1>
        <NycComplaintsTable />
    </div>
)

export default HomePage;