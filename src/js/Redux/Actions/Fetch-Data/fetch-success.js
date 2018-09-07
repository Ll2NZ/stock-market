import { FETCH_SUCCESS } from "../../Constants";
import { processData }   from "../Utilities";

// Process data when correct api call is made
function fetchSuccess(assetData){
    // Process data
    let newData = processData(assetData);

    return {
        type: FETCH_SUCCESS,
        assetData,
        error: false,
        errorMessage: "",
        processedData: newData,
        apiCallLimitReached: false
    };
}

export default fetchSuccess;
