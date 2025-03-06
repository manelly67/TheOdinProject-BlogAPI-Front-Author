const homepage = {
  title: "BLOG | HOMEPAGE",
  message: "Welcome to the API ",
  allPosts: [
    {
      id: "1493c213-b64a-4519-880f-fb0134b64766",
      createdAt: "2025-03-05T22:15:54.565Z",
      title: "Lorem Ipsum",
      author: { username: "cuartousuario" },
      authorId: 6,
    },
  ],
};

const user = {
  id: 6, 
  email: 'cuarto@usuario.com', 
  username: 'cuartousuario', 
  password: '$2b$10$1s0Hsnnb5Aeml35UF9zDcerhtZqM24TJAYsDt3Kh0DuBeufdFAx1i', 
  role: 'AUTHOR',
  comments : [],
  posts : [
    {
      id: "1493c213-b64a-4519-880f-fb0134b64766",
      createdAt: "2025-03-05T22:15:54.565Z",
      title: "Lorem Ipsum",
      authorId: 6,
      content : "Donec bibendum ornare dignissim. Donec bibendum ornare dignissim. Fusce scelerisque in quam. Fusce scelerisque in quam. Donec bibendum ornare dignissim. Fusce scelerisque in quam",
      published : true,
      updatedAt :  "2025-03-05T22:15:54.565Z",
    },
  ],

};

export  {
    homepage,
    user,
};