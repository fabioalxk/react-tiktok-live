import { session } from "../reducers/session";
import { push } from "redux-first-history";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const { setHelloWorld } = session.actions;

export const getHelloWorld = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/hello-world`);

    console.log("res", response);
    if (response.status === 200) {
      dispatch(setHelloWorld(response.data.hello));
    }
  } catch (error) {
    console.error(error);
  }
};
