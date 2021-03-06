import axios from "axios";

//action types

const GET_USERS = "GET_USERS";
const UPDATE_USER = "UPDATE_USER";

//action creators
export function getUsers(users) {
  return { type: GET_USERS, users };
}

export const updateInfo = userInfo => ({ type: GET_USERS, userInfo })

//reducer
export default function users(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case UPDATE_USER:
      return
    default:
      return users;
  }
}

//helper function
function fetchAllUsers(dispatch) {
  return axios
    .get("/api/users")
    .then(res => dispatch(getUsers(res.data)))
    .catch(err => console.error(err));
}

//thunk creators
export function fetchUsers() {
  return function thunk(dispatch) {
    return fetchAllUsers(dispatch);
  };
}

export function deleteUser(id) {
  return function thunk(dispatch) {
    return axios
      .delete(`/api/users/${id}`)
      .then(() => fetchAllUsers(dispatch))
      .catch(err => console.error(err));
  };
}

export function updateUser(userInfo) {
  return function thunk(dispatch) {
    return axios
      .put(`/api/users/${userInfo.id}`, userInfo)
      .then(() => fetchAllUsers(dispatch))
      .catch(err => console.error(err));
  };
}

export function toggleAdmin(id) {
  return function thunk(dispatch) {
    return axios
      .get(`/api/users/${id}`)
      .then(response => {
        return axios.put(`/api/users/${response.data.id}`, {
          isAdmin: response.data.isAdmin === "true" ? false : true
        });
      })
      .then(() => fetchAllUsers(dispatch))
      .catch(err => console.error(err));
  };
}
