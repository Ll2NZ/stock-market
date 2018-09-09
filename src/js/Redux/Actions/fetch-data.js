import { store }         from "../Reducers";
import fetchError        from "./fetch-error";
import fetchSuccess      from "./fetch-success";
import isFetchingData    from "./is-fetching-data";
import fetchTooManyCalls from "./fetch-too-many-calls";

// API info for data request
let url    = "https://www.alphavantage.co/query?";
let apiKey = "apikey=AAG3PU4MLMB9JHS3";

// Make api request
function fetchData(assetName)
{
    // Get asset type request: monthly or daily.
    let assetType = store.getState().userInteraction.assetType;
    let symbol    = `symbol=${assetName}&`;

    // Full url to use in request
    let fullURL = url + assetType + symbol + apiKey;

    return function(dispatch){
        // 1. Notify app of inital request
        dispatch(isFetchingData(true));
        // 2. Next, request data
        return fetch(fullURL).then(res => res.json())
                      .then(data => {
                        // 3. Dispatch error or success
                        if(data["Error Message"])
                        {
                            dispatch(fetchError(data));
                            dispatch(isFetchingData(false));
                        }
                        else if(data["Meta Data"])
                        {
                            dispatch(fetchSuccess(data));
                            dispatch(isFetchingData(false));
                        }
                        else if(data["Information"])
                        {
                            dispatch(fetchTooManyCalls(data));
                            dispatch(isFetchingData(false));
                        }
                    });
    };
}

export default fetchData;