import { LOADING_UI, STOP_LOADING_UI, CLEAR_ERRORS } from "../types";

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
