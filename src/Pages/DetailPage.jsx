import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useIssueContext } from '../Store/IssueContext';

import {
  Container,
  IssueDetail,
  AuthorInfo,
  Avatar,
  StyledMarkdown,
  IssueTitle,
  IssueDescription
} from '../Styled/Detail_styled';

const DetailPage = () => {
  const { selectedIssue, issues, setIssues } = useIssueContext();
  const { gitIssueNumber } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      setLoading(true);
      try {
        // 전역 상태에서 해당 이슈의 상세 내용을 찾음
        const selectedIssueData = issues.find(issue => issue.number === parseInt(gitIssueNumber));
        // 만약 전역 상태에 해당 이슈의 상세 내용이 없다면 API를 호출하여 가져옴
        if (!selectedIssueData) {
          const response = await axios.get(
            `${process.env.REACT_APP_GITHUB_API_DOMAIN}${process.env.REACT_APP_GITHUB_API_PATH}/${gitIssueNumber}`,
            {
              headers: {
                Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`
              }
            }
          );
          // API 응답을 전역 상태에 저장
          setIssues(prevIssues => [...prevIssues, response.data]);
          setIssue(response.data);
        } else {
          // 전역 상태에 해당 이슈의 상세 내용이 있으면 해당 내용을 설정
          setIssue(selectedIssueData);
        }
      } catch (error) {
        console.error('Error fetching issue details:', error);
      }
      setLoading(false);
    };

    fetchIssueDetails();
  }, [gitIssueNumber, issues, setIssues]);

  return (
    <Container>
      <Header organizationName="Angular" repositoryName="angular-cli" />
      {loading && <LoadingSpinner />}
      {!loading && issue && (
        <IssueDetail>
          <AuthorInfo>
            <Avatar src={issue.user.avatar_url} alt={issue.user.login} />
            <IssueTitle>#{issue.number} {issue.title}</IssueTitle>
          </AuthorInfo>
          <IssueDescription>작성일: {new Date(issue.created_at).toLocaleDateString()} 작성자: {issue.user.login} 코멘트수: {issue.comments}</IssueDescription>
          <hr/>
          <StyledMarkdown>{issue.body}</StyledMarkdown>
        </IssueDetail>
      )}
    </Container>
  );
};

export default DetailPage;
