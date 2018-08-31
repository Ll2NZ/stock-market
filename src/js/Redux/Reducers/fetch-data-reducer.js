import { FETCH_SUCCESS } from "../Constants";
import { FETCH_ERROR }   from "../Constants";

function fetchDataReducer(
    state = {
        fetchedData: {
            assetData: [],
            error: false,
            errorMessage: "",
            processedData: {}
        }
    }, 
    action
)
{
    switch(action.type)
    {
        case FETCH_ERROR:
            return Object.assign({}, state, {
                fetchedData: {
                    ...state.fetchedData,
                    assetData: action.assetData,
                    error: action.error,
                    errorMessage: action.errorMessage,
                    processedData: action.processedData
                }
            });
        case FETCH_SUCCESS:
            return Object.assign({}, state, {
                fetchedData: {
                    ...state.fetchedData,
                    assetData: action.assetData,
                    error: action.error,
                    errorMessage: action.errorMessage,
                    processedData: action.processedData
                }
            });
        default:
            return state;
    }
}

export default fetchDataReducer;