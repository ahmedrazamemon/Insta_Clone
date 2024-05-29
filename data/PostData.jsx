import {Users} from './Users';

export const PostData = [
  {
    imgurl:
      'https://cdn.vectorstock.com/i/500p/45/61/girl-hacker-in-a-hoodie-using-laptop-abstract-vector-50654561.jpg',
    username: Users[0].username,
    likes: 7970,
    caption: "making instagram's clone trying to do best hope you will love it",
    profilepicture: Users[0].image,
    comments: [
          {
        user: 'Henry',
        comment: "Wow! it's good",
      },

      {
        user: 'Keven',
        comment: 'Keep going on',
      },
      
      {
        user: 'Hitesh',
        comment: 'Keep it up! best for beginners',
      },

    ],
  },
  {
    imgurl:
      'https://cdn.vectorstock.com/i/500p/45/61/girl-hacker-in-a-hoodie-using-laptop-abstract-vector-50654561.jpg',
    username: Users[1].username,
    likes: 8176,
    caption: 'Love to Code',
    profilepicture: Users[1].image,
    comments: [
      {
        user: 'Harry',
        comment: "Wow! it's good",
      },
      {
        user: 'Peiter',
        comment: 'Keep going on',
      },
    ],
  },
  {
    imgurl:
      'https://cdn.vectorstock.com/i/500p/45/61/girl-hacker-in-a-hoodie-using-laptop-abstract-vector-50654561.jpg',
    username: Users[2].username,
    likes: 8176,
    caption: 'Love to Code',
    profilepicture: Users[2].image,
    comments: [
      {
        user: 'Harry',
        comment: "Wow! it's good",
      },
      {
        user: 'Peiter',
        comment: 'Keep going on',
      },
    ],
  }
];
