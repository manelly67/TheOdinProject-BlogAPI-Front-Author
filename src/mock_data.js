const homepage = {
  title: "BLOG | HOMEPAGE",
  message: "Welcome to the API ",
  allPosts: [{"id":"1493c213-b64a-4519-880f-fb0134b64766","createdAt":"2025-03-05T22:15:54.565Z","title":"Lorem Ipsum","author":{"username":"cuartousuario"},"authorId":6},{"id":"a811e97e-ce2c-46c6-870b-3e498ff4a971","createdAt":"2025-03-07T20:37:07.782Z","title":"Sed rutrum odio ac tellus vestibulum interdum ac et massa","author":{"username":"quintoususario"},"authorId":7},{"id":"a0508d69-5550-4e90-b9f6-9fda31f79cdc","createdAt":"2025-03-07T22:58:45.183Z","title":"Maecenas non leo vestibulum","author":{"username":"sextoususario"},"authorId":9},{"id":"28d2d379-0e12-47da-af50-02f1e5066b24","createdAt":"2025-03-08T00:47:37.049Z","title":"Integer tincidunt nisi ac enim elementum pellentesque.","author":{"username":"cuartousuario"},"authorId":6},{"id":"4b30ccb4-697d-416f-ac28-4061e539d43d","createdAt":"2025-03-08T00:59:17.236Z","title":"Suspendisse in justo id metus elementum","author":{"username":"sextoususario"},"authorId":9}],
};

const user = {
  id: 6,
  email: "cuarto@usuario.com",
  username: "cuartousuario",
  password: "$2b$10$1s0Hsnnb5Aeml35UF9zDcerhtZqM24TJAYsDt3Kh0DuBeufdFAx1i",
  role: "AUTHOR",
  comments: [],
  posts: [
    {
      id: "1493c213-b64a-4519-880f-fb0134b64766",
      createdAt: "2025-03-05T22:15:54.565Z",
      title: "Lorem Ipsum",
      authorId: 6,
      content:
        "Donec bibendum ornare dignissim. Donec bibendum ornare dignissim. Fusce scelerisque in quam. Fusce scelerisque in quam. Donec bibendum ornare dignissim. Fusce scelerisque in quam",
      published: true,
      updatedAt: "2025-03-05T22:15:54.565Z",
    },
  ],
};

const post = {
  post: {
    id: "1493c213-b64a-4519-880f-fb0134b64766",
    createdAt: "2025-03-05T22:15:54.565Z",
    title: "Lorem Ipsum",
    authorId: 6,
    author: { username: "cuartousuario" },
    content:
      "Donec bibendum ornare dignissim. Fusce scelerisque in quam tempor pellentesque. Sed feugiat eros nulla, non tempor sem sagittis suscipit. Nulla ullamcorper eu lectus at aliquet. Curabitur maximus ipsum id lorem condimentum aliquam. Sed at mauris mi. Donec malesuada vulputate varius. Nam in sagittis tellus, sed vehicula turpis.Nulla molestie tellus nec feugiat vulputate. Sed rutrum odio ac tellus vestibulum interdum ac et massa. Nunc blandit iaculis eros, nec vehicula velit elementum id. Vestibulum posuere metus erat, vel auctor lacus blandit sit amet. Ut a ultrices dolor, nec scelerisque dolor. Donec eu fringilla ex. Curabitur euismod dolor lobortis arcu fringilla efficitur et in arcu. Integer tincidunt nisi ac enim elementum pellentesque.",
    published: true,
    updatedAt: "2025-03-05T22:15:54.565Z",
    comment: [],
  },
};

export { homepage, user, post };


const received = false;
const str = received.toString();
const bool = str.toLowerCase() === "true";


console.log(received);
console.log(str);
console.log(bool);