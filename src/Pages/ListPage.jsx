import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../Components/Header';
import AdvertisementImageSrc from './IMG_2126.jpg';
import { useSelectedIssue } from '../Components/SelectedIssueContext';


const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

const ListPage = () => {
  const { selectedIssue, setSelectedIssue } = useSelectedIssue(); // context 사용

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
<<<<<<< HEAD
  const [selectedIssue, setSelectedIssue] = useState(null); // 선택된 이슈 상태 추가

=======
>>>>>>> b627e06 (update context-api for listpages)
  const observer = useRef();

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/angular/angular-cli/issues?page=${page}&per_page=10&state=open&sort=comments`,
          {
            headers: {
<<<<<<< HEAD
              Authorization: 'YOUR_TOKEN'
=======
              Authorization: 'YOUR_ACCESS_TOKEN'
>>>>>>> b627e06 (update context-api for listpages)
            }
          }
        );
        if (response.data.length === 0) {
          setHasMore(false);
          return;
        }
        setIssues(prevIssues => [...prevIssues, ...response.data]);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
      setLoading(false);
    };

    fetchIssues();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || // 스크롤이 맨 아래에 도달하지 않았거나,
      loading || // 현재 로딩 중이거나,
      !hasMore // 더 이상 데이터가 없으면 처리 중단
    ) {
      return;
    }
    setPage(prevPage => prevPage + 1); // 페이지 증가
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트를 감지하여 handleScroll 함수 실행
    return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
<<<<<<< HEAD
  }, []);
=======
  }, [handleScroll]);
>>>>>>> b627e06 (update context-api for listpages)

  // 클릭 시 자동으로 페이지 이동하는 함수
  const handleIssueItemClick = (issueNumber) => {
    setSelectedIssue(issueNumber); // 클릭한 이슈 번호를 상태에 저장
    window.location.href = `/detail/${issueNumber}`;
  };

  return (
    <Container>
      <Header organizationName="Angular" repositoryName="angular-cli" />
      <IssueList>
        {issues.map((issue, index) => (
          <React.Fragment key={issue.id}>
            <IssueItem 
              onClick={() => handleIssueItemClick(issue.number)} 
              isSelected={selectedIssue === issue.number} // 선택된 이슈에 대한 조건 추가
            >
              <h3>#{issue.number} {issue.title}</h3>
              <p>작성자 {issue.user.login}, 작성일 {new Date(issue.created_at).toLocaleDateString()} 코멘트: {issue.comments}</p>
            </IssueItem>
            {index === 4 && hasMore && (
              <IssueItem>
               <AdvertisementBanner href="https://www.wanted.co.kr/" target="_blank">
                 <AdvertisementImage src={AdvertisementImageSrc} alt="Advertisement Banner" />
               </AdvertisementBanner>
              </IssueItem>
            )}
          </React.Fragment>
        ))}
      </IssueList>
    </Container>
  );
};

export default ListPage;

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  width: 100%; 
  max-width: 80%; 
  height: 800px;
  border: 3px solid black;
  margin: 20px auto;
`;

const IssueList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  overflow-y: auto;
  max-height: 700px;
`;

const IssueItem = styled.li`
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 12px;
  cursor: pointer; 
<<<<<<< HEAD
  background-color: ${props => props.isSelected ? '#ddd' : 'transparent'}; // 선택된 항목일 때 해당 이슈 항목을 특정 색상으로 표시
=======
  background-color: ${props => props.isSelected ? '#ddd' : 'transparent'}; // 선택된 항목일 때 해당 이슈 항목을 특정 색상으로 표시 
>>>>>>> b627e06 (update context-api for listpages)
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

const AdvertisementBanner = styled.a`
  display: block;
`;

const AdvertisementImage = styled.img`
  width: 100%;
`;
