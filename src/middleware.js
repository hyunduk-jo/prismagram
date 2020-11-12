//여러곳에서 사용 가능한 인증여부 함수
export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error('You need to login to perform this action!')
  }
  return;
}

