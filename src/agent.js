import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

// const API_ROOT = "https://pro-api.coinmarketcap.com/v1";
const API_ROOT = "/data";

const encode = encodeURIComponent;
const responseBody = res => res.body;

// let token = null;
// const tokenPlugin = req => {
//   if (token) {
//     req.set("authorization", `Token ${token}`);
//   }
// };
const tokenPlugin = "b2423f65-99b1-4999-8b5c-f6c6f20f6561";

const requests = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .set("X-CMC_PRO_API_KEY", tokenPlugin)
      .set("Accept", "application/json")
      // .set("Origin", "")
      .set("Access-Control-Allow-Origin", "*")
      .set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      )
      // .withCredentials()
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody)
};

// const Auth = {
//   current: () => requests.get("/user"),
//   login: (email, password) =>
//     requests.post("/users/login", { user: { email, password } }),
//   register: (username, email, password) =>
//     requests.post("/users", { user: { username, email, password } }),
//   save: user => requests.put("/user", { user })
// };

// const Tags = {
//   getAll: () => requests.get("/tags")
// };

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = cryptocurrency =>
  Object.assign({}, cryptocurrency, { slug: undefined });
const Cryptocurrency = {
  // all: page => requests.get(`/cryptocurrency?${limit(10, page)}`),
  all: page =>
    requests.get(
      `/cryptocurrency/info?id=1,1027,52,825,1831,2,1765,1839,512,1958,2010,328,1720,131`
    ),
  listing: () => requests.get(`/cryptocurrency/listings/latest`),
  byAuthor: (author, page) =>
    requests.get(`/cryptocurrency?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/cryptocurrency?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug => requests.del(`/cryptocurrency/${slug}`),
  favorite: slug => requests.post(`/cryptocurrency/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(
      `/cryptocurrency?favorited=${encode(author)}&${limit(5, page)}`
    ),
  feed: () => requests.get("/cryptocurrency/info?id=1"),
  get: slug => requests.get(`/cryptocurrency/listings/latest`),
  unfavorite: slug => requests.del(`/cryptocurrency/${slug}/favorite`),
  update: cryptocurrency =>
    requests.put(`/cryptocurrency/${cryptocurrency.slug}`, {
      cryptocurrency: omitSlug(cryptocurrency)
    }),
  create: cryptocurrency => requests.post("/cryptocurrency", { cryptocurrency })
};

// const Comments = {
//   create: (slug, comment) =>
//     requests.post(`/cryptocurrency/${slug}/comments`, { comment }),
//   delete: (slug, commentId) =>
//     requests.del(`/cryptocurrency/${slug}/comments/${commentId}`),
//   forArticle: slug => requests.get(`/cryptocurrency/${slug}/comments`)
// };

// const Profile = {
//   follow: username => requests.post(`/profiles/${username}/follow`),
//   get: username => requests.get(`/profiles/${username}`),
//   unfollow: username => requests.del(`/profiles/${username}/follow`)
// };

export default {
  Cryptocurrency
  // Auth,
  // Comments,
  // Profile,
  // Tags,
  // setToken: _token => {
  //   token = _token;}
};
