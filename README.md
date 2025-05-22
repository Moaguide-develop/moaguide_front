# 모아가이드 - STO 정보 큐레이션 플랫폼


<br/>

# 프로젝트 소개



> **제작인원** : 7명 (PM 2명, UI/UX 외주 제작, FE 3명, BE 2명)

> **서비스 소개** : 해당 프로젝트는 분산된 STO(토큰증권) 시장 정보를 통합해 투자자들에게 신뢰도 높은 최신 데이터와 분석 리포트를 제공하는 서비스입니다. 자체 플랫폼 개발과 마케팅을 통해 개발 초기 67여 명의 유저를 모집했으며, 2024년까지 2,000명의 유저를 확보할 계획입니다. MVP 개발 이후 플랫폼 확장과 B2B 모델을 통해 시장 점유율을 확대할 예정입니다. 조각투자 상품 정보 제공, 최신 뉴스를 제공하며 자체 프리미엄 구독권 결제 시 투자 가이드 서비스를 함께 제공합니다.

</aside>

<br/>

## 🧑‍🤝‍🧑 Contributors

### FE Team

<div>
  <table>
      <tr>
          <th>방호진</th>
          <th>정지오</th>
          <th>조기범</th>
      </tr>
      <tr>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/132210541?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/banhogu">@Bang HoJin</a>
          </td>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/104253583?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/jiohjung98">@jiohjung98</a>
          </td>
          <td align="center">
              <img src="https://avatars.githubusercontent.com/u/95483959?v=4" alt="avatar" width="150" style="max-width: 100%;" /><br />
              <a href="https://github.com/eun-hak">@JO KIBEOM</a>
          </td>
      </tr>
  </table>
</div>

<br/>

# 프로젝트 상세 소개

### 💡 핵심 기능

> **조각 투자 상품 실시간 정보 제공**
> 
> - 상품의 시가총액, 현재가, 등락 폭, 수익률 데이터를 실시간 그래프를 통해 시각적으로 제공
> - 관심 상품 저장 기능을 통해 저장한 상품에 접근
> - 검색 기능을 통해 투자 상품에 쉽고 빠르게 접근

> **투자 상품 관련 기사 모아보기**
> 
> - 부동산, 음악 저작권, 미술품 등 카테고리별 최신 기사로 바로 이동할 수 있는 링크제공
> - 가장 많이 본 기사, 최신순, 인기순 등 다양한 정렬 방식으로 뉴스 정보 제공

> **조각 투자 가이드**
> 
> - 조각 투자에 익숙하지 않은 사용자를 위해, 투자 가이드 커리큘럼과 리포트를 PDF 형식으로 제공

> **로그인/회원가입**
> 
> - 카카오, 네이버, 구글 계정을 통해 소셜 로그인 기능 제공
> - 휴대폰 인증이 포함된 회원가입
> - 회원탈퇴 기능

> **ETC**
> 
> - 마이페이지, 회원정보 수정
> - 카카오톡 1:1 문의
> - 모바일 반응형 디자인

<br/>

# 프로젝트 기술 스택

<img width="1028" alt="Untitled (8)" src="https://github.com/user-attachments/assets/d7890f04-7811-4843-a003-51b1fe5a62a9">

- **개발** : `TypeScript`, `Next.js`
- **스타일링** : `Tailwind CSS`, `Figma`
- **상태 관리** : `Zustand`, `React Query`
- **API 모킹** : `MSW`
- **배포 및 호스팅** : `Vercel` , `EC2`
- **ETC** : `react-virtuoso`, `react-markdown`, `chart.js`, `jspdf`, `swiper`

<br/>

## Team Convention

| 태그                  | 설명                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| `feat: `             | 새로운 기능 추가 및 개선                                                |
| `style: `              | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우                                                         |
| `design: `           | CSS 등 사용자 UI 디자인 변경                                              |
| `fix: `              | 기존 기능 수정 (주로 안 좋았던 것에서 좋은 것으로)                                                   |
| `bug: `          | 버그 수정                                    |
| `refactor: `            | 결과의 변경 없이 코드의 구조를 재조정한 경우                     |
| `test: `         |  테스트 코드 추가                                                   |
| `docs: `          | 코드가 아닌 문서를 수정한 경우                                                |
| `remove: `             | 파일을 삭제하는 작업만 수행                                                      |
| `rename: `             | 파일 또는 폴더명을 수정하거나 위치(경로)를 변경                      |
| `asset: `            | 이미지 등 assets 파일 추가 |
| `chore: `           | 그 외 기타 수정                      |

<br/>

