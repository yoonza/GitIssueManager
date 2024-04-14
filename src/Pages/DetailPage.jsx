//DetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../Components/Header';
import ReactMarkdown from 'react-markdown';

const DetailPage = ({ match }) => {
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      setLoading(true);
      try {
        const issueNumber = match.params.issueNumber;
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
  }, [match.params.issueNumber]);

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
  width: 500px;
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