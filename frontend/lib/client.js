import axios from "axios";

class ApiClient {
  constructor() {
    this.axios = axios.create({ baseURL: "http://localhost:3001" });
    this.userToken = null;
    let mybToken = localStorage.getItem("jwt");

    if (mybToken) {
      this.rememberToken(mybToken);
    }
  }

  isLoggedIn() {
    return !!this.userToken;
  }

  async register({ username, email, fullName, password }) {
    return await this.axios.post("/api/user/register", {
      username,
      email,
      fullName,
      password,
    });
  }

  async login(loginParams) {
    const response = await this.doLoginRequest(loginParams);
    this.rememberToken(response.data.token);
    localStorage.setItem("jwt", response.data.token);
    return response;
  }

  logout() {
    localStorage.removeItem("jwt");
    this.userToken = null;
    this.axios = axios.create({ baseURL: "http://localhost:3001" });
  }

  async doLoginRequest({ username, email, password }) {
    if (email) {
      return await this.axios.post("/api/user/login", { email, password });
    }

    return await this.axios.post("/api/user/login", { username, password });
  }

  /* ---------------------- Liste CRUD ------------------------- */

  async fetchLists() {
    console.log("GETTING MY LISTS: ");
    const response = await this.axios.get("/my/lists");
    return response.data.lists;
  }

  async createList({ title }) {
    console.log("CREATING MY LISTS: ");
    const response = await this.axios.post("/my/lists", {
      title,
      archived: false,
    });
    return response.data.id;
  }

  async updateList({ id, title, archived }) {
    console.log("UPDATING MY LISTS: ");
    return await this.axios.put("/my/lists", { id, title, archived });
  }

  async deleteList({ id }) {
    console.log("DELETE MY LISTS: ");
    return await this.axios.delete(`/my/lists/${id}`);
  }

  rememberToken(token) {
    this.axios.defaults.headers.common["Authorization"] = `Bearer: ${token}`;
    this.userToken = token;
  }

  /* ------------------------- Itemi CRUD ------------------------------ */
  async createItem(listId, data) {
    return await this.axios.post(`/lists/${listId}/items`, data);
  }
  // async fetchItems() {
  //   console.log("GETTING MY ITEMS: ");
  //   const response = await this.axios.get("");
  // }
}

const client = new ApiClient();
window.client = client;
export default client;
