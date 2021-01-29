import axios from 'axios';

import { errorSiteInfo ,clearError } from './';

import { FETCH_SITE_INFO, SITE_INFO_UPDATE } from './types';

const getSiteInfo = (site) => ({
  type: FETCH_SITE_INFO,
  site,
});

const siteInfoUpdate = (site) => ({
  type: SITE_INFO_UPDATE,
  site,
});

export const fetchSiteInfo = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/sites/`)
    const {success, siteInfo, error} = res.data;
    if (error||!success) throw new Error(error);
    dispatch(getSiteInfo(siteInfo[0]))
    dispatch(clearError('site'));
  } catch (error) {
    dispatch(errorSiteInfo(error.message))
  }
};

export const editSiteInfo = (credential) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/sites/`, credential);
    const {success, siteInfo, error} = res.data;
    console.log('siteInfo :>> ', siteInfo[0]);
    if (error||!success) throw new Error(error);
    dispatch(siteInfoUpdate(siteInfo[0]));
    dispatch(clearError('site'));
  } catch (error) {
    dispatch(errorSiteInfo(error.message));
  }
};
