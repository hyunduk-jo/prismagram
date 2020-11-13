export const USER_FRAGMENT = `
fragment UserParts on User{
  id
  userName
  email
  firstName
  lastName
  bio
  posts {
    id
    caption
  }
  following{
    id
    userName
  }
  followers{
    id
  }
}
`;

export const COMMENT_FRAGMENT = `
  fragment CommentParts on Comment{
    id
    text
    user{
      userName
    }
  }
`;