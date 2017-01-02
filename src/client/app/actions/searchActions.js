import axios from 'axios';
import { UPDATE_SEARCH_FIELD, SEARCH_RESULTS, CLEAR_SEARCH_INPUT } from '../constants';
import { API_URL, API_OFFSET, API_LIMIT, API_RESULT_TYPE } from '../utils/constants';
import { parseSearchResults, getAlbumIds } from '../utils/searchUtils';

export const searchInput = (val) => {
    return {
        type: UPDATE_SEARCH_FIELD,
        data:  {
            currentSearch: val
        }
    }
};

export const searchForm = (val) => {
    if (val === '') {
        // dispatch validation error
        return;
    }
    const encodedQuery = encodeURIComponent(val);
    const searchUrl = `${API_URL}/search?query=${encodedQuery}&offset=${API_OFFSET}&limit=${API_LIMIT}&type=${API_RESULT_TYPE}`;

    return async (dispatch) => {
        try {
            const { data, status } = await axios.get(searchUrl);

            if (status !== 200) {
                console.log('Something went wrong...');
                // dispatch error message
                return;
            }

            const albumIds = getAlbumIds(data);
            const queryString = albumIds.join();
            const albumUrl = `${API_URL}/albums?ids=${queryString}`;
            const albumResults = await axios.get(albumUrl);

            if (albumResults.status !== 200) {
                console.log('Something went wrong...');
                // dispatch error message
                return;
            }

            const { albums } = albumResults.data;
            const parsedSearchResults = parseSearchResults(data, albums);

            dispatch({
                type: CLEAR_SEARCH_INPUT
            });

            dispatch({
                type: SEARCH_RESULTS,
                data: parsedSearchResults
            });

        } catch (err) {
            console.log(err);
        }
    }
};
