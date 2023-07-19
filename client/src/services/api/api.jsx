import axios from "axios";

//USER APIs
export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    return console.log(error.message);
  }
}

export async function getUserByUsername(username) {
  try {
    const response = await axios.get(`/user/username/${username}`);
    return response.data;
  } catch (err) {
    console.log(
      "Error while fetching particular post data using GET API method: " + err
    );
  }
}

export async function updateUser(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`/user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function refreshToken(refreshToken) {
  try {
    const response = await axios.post(`/user/refreshToken`,{refreshToken});
    return response.data;
  } catch (err) {
    console.log(
      "Error while sending particular post data using POST API method: " + err
    );
  }
}
// BLOG POST APIs
export async function getAllPosts() {
  try {
    const response = await axios.get(`/post/`);
    return response.data;
  } catch (err) {
    console.log(
      `Error while Fetching Particular User Data using GET API Method : ${err}`
    );
  }
}

export async function getUserPost(post_id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/post/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.post;
  } catch (err) {
    window.location.href = "/authorpanel/blogs";
    console.log(
      `Error while Fetching Particular User Data using GET API Method : ${err}`
    );
  }
}

export async function getPost(slug) {
  try {
    const response = await axios.get(`/post/slug/${slug}`);
    return response.data;
  } catch (err) {
    console.log(
      "Error while fetching particular post data using GET API method: " + err
    );
  }
}

export async function getPostsByCategory(category) {
  try {
    const response = await axios.get(`/post/category/${category}`);
    return response.data;
  } catch (err) {
    console.log(
      "Error while fetching particular post data using GET API method: " + err
    );
  }
}

export async function addPost(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`/post`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function updatePost(post_id, data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`/post/${post_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function getUserPosts() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/post/user-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function deletePost(post_id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`/post/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function getPostsBySearch(key, limit) {
  try {
    const response = await axios.get(`/post/search`, {
      params: { key: key, limit: limit },
    });
    return response.data;
  } catch (err) {
    console.log(
      "Error while fetching particular post data using GET API method: " + err
    );
  }
}

export async function getPostsBySearchQuery(query) {
  try {
    const response = await axios.get(`/post/search/${query}`);
    return response.data;
  } catch (err) {
    console.log(
      "Error while fetching particular post data using GET API method: " + err
    );
  }
}


