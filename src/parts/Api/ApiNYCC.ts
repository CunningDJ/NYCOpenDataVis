import axios from 'axios';

import { INycComplaintResponse } from './Api.d';

export const BASE_URL = "https://data.cityofnewyork.us/resource/9s4h-37hy.json";


export const COL = {
    cmplnt_num: "cmplnt_num",
    cmplnt_fr_dt: "cmplnt_fr_dt",        // datestring
    complnt_fr_tm: "complnt_fr_tm",
    cmpnt_to_dt: "cmpnt_to_dt",        // datestring
    cmplnt_to_tm: "cmplnt_to_tm",
    addr_pct_cd: "addr_pct_cd",
    rpt_dt: "rpt_dt",            // datestring
    ky_cd: "ky_cd",
    ofns_desc: "ofns_desc",
    pd_cd: "pd_cd",
    pd_desc: "pd_desc",
    crm_atpt_cptd_cd: "crm_atpt_cptd_cd",
    law_cat_cd: "law_cat_cd",
    boro_nm: "boro_nm",
    loc_of_occur_desc: "loc_of_occur_desc",
    prem_typ_desc: "prem_typ_desc",
    juris_desc: "juris_desc",
    jurisdiction_code: "jurisdiction_code",
    parks_nm: "parks_nm",
    hadevelopt: "hadevelopt",
    housing_psa: "housing_psa",
    x_coord_cd: "x_coord_cd",
    y_coord_cd: "y_coord_cd",
    susp_age_group: "susp_age_group",
    susp_race: "susp_race",
    susp_sex: "susp_sex",
    transit_district: "transit_district",
    latitude: "latitude",
    longitude: "longitude",
    lat_lon_city: "lat_lon_city",
    lat_lon_address: "lat_lon_address",
    patrol_boro: "patrol_boro",
    //lat_lon: "lat_lon",
    station_name: "station_name",
    lat_lon_state: "lat_lon_state",
    vic_age_group: "vic_age_group",
    lat_lon_zip: "lat_lon_zip",
    vic_race: "vic_race",
    vic_sex: "vic_sex"
}

export const COL_IDTONAME_MAP = {
    cmplnt_num: "Complaint Num",
    cmplnt_fr_dt: "Date-Time",        // datestring
    complnt_fr_tm: "complnt_fr_tm",
    cmpnt_to_dt: "cmpnt_to_dt",        // datestring
    cmplnt_to_tm: "cmplnt_to_tm",
    addr_pct_cd: "addr_pct_cd",
    rpt_dt: "rpt_dt",            // datestring
    ky_cd: "ky_cd",
    ofns_desc: "ofns_desc",
    pd_cd: "PD CD",
    pd_desc: "PD Description",
    crm_atpt_cptd_cd: "Crime Status",
    law_cat_cd: "Category",
    boro_nm: "Borough",
    loc_of_occur_desc: "Occurred",
    prem_typ_desc: "Premises",
    juris_desc: "Juris. Desc",
    jurisdiction_code: "Juris. Code",
    parks_nm: "parks_nm",
    hadevelopt: "hadevelopt",
    housing_psa: "housing_psa",
    x_coord_cd: "X Coord (CD)",
    y_coord_cd: "Y Coord (CD)",
    susp_age_group: "Susp Age Group",
    susp_race: "Susp Race",
    susp_sex: "Susp Sex",
    transit_district: "Transit District",
    latitude: "Lat",
    longitude: "Lon",
    lat_lon_city: "Lat-Lon City",
    lat_lon_address: "Lat-Lon Addr",
    patrol_boro: "Patrol Borough",
    lat_lon: "Lat-Lon",
    station_name: "Station Name",
    lat_lon_state: "Lat-Lon State",
    vic_age_group: "Vic Age Grp",
    lat_lon_zip: "Lat-Lon Zip",
    vic_race: "Vic Race",
    vic_sex: "Vic Sex"
}

export function fetchData(): Promise<INycComplaintResponse> {
    return axios.get(BASE_URL);
}