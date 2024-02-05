export const ApiEndpoints = {
  message: {
    method: "POST" as "POST",
    url: "/api/message",
  },
  likes: {
    post: {
      method: "POST" as "POST",
      url: "/api/likes",
    },
    get: {
      method: "GET" as "GET",
      url: "/api/likes",
    },
  },
};
