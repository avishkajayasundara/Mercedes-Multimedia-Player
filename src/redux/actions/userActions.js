import axios from "axios";
import jwtDecode from "jwt-decode";

import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  STOP_LOADING_UI,
} from "../types";

export const loginUser = (user_data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/room-login", user_data);
    setAuthorizationHeader(results.data.token);
    let user = await dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    let result = await axios.get("/logged-room");
    dispatch({
      type: SET_USER,
      payload: result.data.room,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const setAuthorizationHeader = (token) => {
  const banger_token = `Bearer ${token}`;
  localStorage.setItem("token", banger_token);
  axios.defaults.headers.common["Authorization"] = banger_token;
};
