import { AxiosResponse } from 'axios';


export interface INycComplaintResponse extends AxiosResponse<INycComplaintData> {}

export interface IIndexedTabularData<T> {
    [rowIdx: number]: T
}

export interface IDataRow {
    [colId: string]: (number|Date|string|boolean)    // non-object
}

export interface INycComplaintData extends IIndexedTabularData<INycComplaintData> {}

// https://dev.socrata.com/foundry/data.cityofnewyork.us/9s4h-37hy
interface INycComplaintDataRow extends IDataRow {
    cmplnt_num: number,
    cmplnt_fr_dt: Date,        // datestring
    complnt_fr_tm: string,
    cmpnt_to_dt: Date,        // datestring
    cmplnt_to_tm: string,
    addr_pct_cd: number,
    rpt_dt: Date,            // datestring
    ky_cd: number,
    ofns_desc: string,
    pd_cd: number,
    pd_desc: string,
    crm_atpt_cptd_cd: string,
    law_cat_cd: string,
    boro_nm: string,
    loc_of_occur_desc: string,
    prem_typ_desc: string,
    juris_desc: string,
    jurisdiction_code: number,
    parks_nm: string,
    hadevelopt: string,
    housing_psa: string,
    x_coord_cd: number,
    y_coord_cd: number,
    susp_age_group: string,
    susp_race: string,
    susp_sex: string,
    transit_district: number,
    latitude: number,
    longitude: number,
    lat_lon_city: string,
    lat_lon_address: string,
    patrol_boro: string,
    //lat_lon: IPoint,
    station_name: string,
    lat_lon_state: string,
    vic_age_group: string,
    lat_lon_zip: string,
    vic_race: string,
    vic_sex: string
}

interface IPoint {
    type: string,    // "Point"
    coordinates: [number, number]
}