import { URL } from "./constant";
import apiHelper from "./apiHelper";

export const loginApi = async (empId) => {
  return await apiHelper("post", `${URL}/user/login`, { empId: empId }, "");
};

export const getAllIdeas = async (token) => {
  return await apiHelper("get", `${URL}/user/ideas`, "", {
    Authorization: `Bearer ${token}`,
  });
};

export const updateNote = async (id, token, title, description) => {
  return await apiHelper(
    "put",
    `${URL}/user/idea/editIdea/${id}`,
    { title: title, description: description },
    { Authorization: `Bearer ${token}` }
  );
};

export const addNote = async (token, title, description,tags) => {
  return await apiHelper(
    "post",
    `${URL}/user/idea/addIdea`,
    { title: title, description: description, tags:tags?tags:[] },
    { Authorization: `Bearer ${token}` }
  );
};

