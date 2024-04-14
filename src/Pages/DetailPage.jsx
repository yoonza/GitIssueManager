import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../Components/Header';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // useParams를 import합니다.

const DetailPage = () => {
  const { issueNumber } = useParams(); // URL 파라미터에서 issueNumber를 가져옵니다.
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/angular/angular-cli/issues/${issueNumber}`
        );
        setIssue(response.data);
      } catch (error) {
        console.error('Error fetching issue details:', error);
      }
      setLoading(false);
    };
  
    fetchIssueDetails();
  }, [issueNumber]); // 이제 issueNumber를 의존성 배열에 추가합니다.

  return (
    <Container>
      <Header organizationName="Angular" repositoryName="angular-cli" />
      {loading && <p>Loading...</p>}
      {!loading && issue && (
        <IssueDetail>
          <AuthorInfo>
            <Avatar src={issue.user.avatar_url} alt={issue.user.login} />
            <h3 style={{ fontSize: '15px' }}>#{issue.number} {issue.title}</h3>
          </AuthorInfo>
          <p style={{ marginLeft: '10%',fontSize: '12px' }}>작성일: {new Date(issue.created_at).toLocaleDateString()} 작성자: {issue.user.login} 코멘트수: {issue.comments} </p>
          <hr/> 
          <StyledMarkdown>{issue.body}</StyledMarkdown>
        </IssueDetail>
      )}
    </Container>
  );
};

export default DetailPage;

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  width: 100%; /* 모바일 앱 화면일 때 전체 너비를 차지하도록 설정 */
  max-width: 80%; /* 웹 화면일 때 최대 너비를 80%로 제한 */
  border: 3px solid black;
  margin: 20px auto;
  height: 800px;
`;

const IssueDetail = styled.div`
  margin-top: 1px;
  padding: 10px;
  max-height: 700px;
  overflow-y: auto;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #ddd;
`;

const StyledMarkdown = styled(ReactMarkdown)`
  font-size: 14px; /* 원하는 폰트 크기로 조절하세요 */
`; 
