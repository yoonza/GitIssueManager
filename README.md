# About GitIssueManager Project

⚙️ 기술 스택
1. React
2. Axios
3. Context-API
4. Styled-components
<br/>
📄 ListPage 기능 
1. GitHub API를 사용하여 이슈를 가져옵니다.<br/>
⚠️ 개인 Token을 발급해야 합니다. <br/><br/>
2. 사용자의 스크롤 이벤트를 감지하여 새로운 이슈를 자동으로 로드합니다.<br/>
⚠️ 페이지가 처음 로드될 때 초기 화면에는 아무것도 표시되지 않을 수 있습니다.<br/>
⚠️ 사용자가 페이지를 아래로 스크롤하면 첫 번째 이슈 화면의 10개가 자동으로 로드됩니다.<br/>
⚠️ 추가로 이슈를 로드하려면 페이지를 계속 아래로 스크롤하면 됩니다.<br/>
⭐️ LoadingSpinner을 활용하여 페이지 스크롤 시, 사용자에게 이슈가 추가되고 있음을 표시합니다.<br/><br/>
3. 이슈 목록에서 특정 이슈를 클릭하면 해당 이슈의 상세 페이지로 이동합니다.<br/>
<br/>
📄 DetailPage 기능</br>
1. 상세 페이지에서는 이슈의 제목, 작성자, 작성일, 코멘트 수, 본문 등의 정보를 볼 수 있습니다.<br/>
⚠️ 본문의 내용은 Markdown 형식을 적용하였습니다.<br/><br/>
2. URL의 파라미터로 전달된 gitIssueNumber를 사용하여 해당 이슈의 상세 정보를 가져옵니다<br/>
⚠️ 만약 전역 상태의 issues 배열에 해당 이슈의 정보가 없다면, API를 활용하여 데이터를 가져온 후, 전역 상태의 issues 배열에 추가합니다.<br/>
<br/>
⚒️ 구조</br>
- public : Advertisment img<br/><br/>
- src</br>
1️⃣ Component: Header.js(공통 헤더), LoadingSpinner(로딩 스피너).js</br>
2️⃣ Pages: DetailPage.jsx(상세페이지), ListPage.jsx(목록페이지)</br>
3️⃣ Store: IssueContext.js(ContextApi 구현)</br>
4️⃣ Styled: Detail_styled.js(상세페이지 스타일컴포넌트), List_styled.js(목록페이지 스타일컴포넌트)</br>
5️⃣ App.js(with Router)