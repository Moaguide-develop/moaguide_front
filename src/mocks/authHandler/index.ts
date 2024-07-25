import { http, HttpResponse } from 'msw';

import { MOCK_LOGIN_DATA } from './mocks';

export const authHandlers = [
  /* ----- 회원가입 api ----- */
  http.post(`/join`, () => {
    return HttpResponse.json('회원가입 성공!!');
  }),

  /* ----- 로그인 api ----- */
  http.get(`/sign`, () => {
    return HttpResponse.json(MOCK_LOGIN_DATA);
  })
];
