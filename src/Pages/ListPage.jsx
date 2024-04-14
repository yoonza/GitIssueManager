
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 import합니다.
import Header from '../Components/Header';
import AdvertisementImageSrc from './IMG_2126.jpg';

// LoadingSpinner 컴포넌트 정의
const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

const ListPage = () => {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/angular/angular-cli/issues?page=${page}&per_page=10&state=open&sort=comments`,
          {
            headers: {
              Authorization: 'YOUR_TOKEN' // 여기에 개인 액세스 토큰을 넣어주세요.
            }
          }
        );
        setIssues(prevIssues => [...prevIssues, ...response.data]);
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
      setLoading(false);
    };

    fetchIssues();
  }, [page]);

  return (
    <Container>
      <Header organizationName="Angular" repositoryName="angular-cli" />
      <IssueList>
        {issues.map((issue, index) => (
          <React.Fragment key={issue.id}>
            <IssueItem>
              {/* 각 issue를 클릭하여 해당 이슈의 상세 페이지로 이동하는 링크 추가 */}
              <LinkStyled to={`/detail/${issue.number}`}> 
                <h3>#{issue.number} {issue.title}</h3>
              </LinkStyled>
              <p>작성자 {issue.user.login}, 작성일 {new Date(issue.created_at).toLocaleDateString()} 코멘트: {issue.comments} </p>
            </IssueItem>
            {index === 3 && ( // 다섯 번째 아이템인 경우에만 광고를 표시합니다.
              <IssueItem>
                <AdvertisementBanner href="https://www.wanted.co.kr/" target="_blank">
                  <AdvertisementImage src={AdvertisementImageSrc} alt="Advertisement Banner" />
                </AdvertisementBanner>
              </IssueItem>
            )}
          </React.Fragment>
        ))}
      </IssueList>
      {loading && <LoadingSpinner />} {/* 로딩 상태일 때 로딩 스피너 표시 */}
    </Container>
  );
};

export default ListPage;

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  width: 400px;
  height: 800px;
  border: 3px solid black;
  margin:20px auto;
`;

const IssueList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 20px; /* IssueList와 Container 사이의 간격을 조정합니다. */
    overflow-y: auto; /* IssueList가 넘치는 경우 스크롤을 추가합니다. */
    max-height: 700px; /* 최대 높이를 지정하여 넘치는 경우 스크롤이 나타나도록 합니다. */
    `;


const IssueItem = styled.li`
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 12px;
`;

const AdvertisementBanner = styled.a`
  display: block;
`;

const AdvertisementImage = styled.img`
  width: 100%;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 링크 스타일링
const LinkStyled = styled(Link)`
  text-decoration: none; /* 링크의 밑줄을 제거합니다. */
  color: black; /* 링크의 색상을 지정합니다. */
`;