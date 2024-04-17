import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useIssueContext } from '../Store/IssueContext'; 
import {
  Container,
  IssueList,
  IssueItem,
  AdvertisementBanner,
  AdvertisementImage
} from '../Styled/List_styled';

const ListPage = () => {
  const { issues, setIssues } = useIssueContext();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    const fetchIssues = async () => {
      if (!hasMore || loading) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_GITHUB_API_DOMAIN}${process.env.REACT_APP_GITHUB_API_PATH}?state=open&sort=comments-desc&per_page=10&page=${page}`,
          {
            headers: {
              Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            }
          }
        );

        const newIssues = response.data.map((fetchedIssue, index) => ({
          id: (page - 1) * 100 + index,
          issueNumber: fetchedIssue.number,
          issueTitle: fetchedIssue.title,
          authorLogin: fetchedIssue.user.login,
          commentCount: fetchedIssue.comments,
          createdAt: fetchedIssue.created_at.substr(0, 10),
          authorAvatarUrl: fetchedIssue.user.avatar_url,
          body: fetchedIssue.body,
        }));

        setIssues(prevIssues => [...prevIssues, ...newIssues]);
        setPage(prevPage => prevPage + 1);
        setHasMore(newIssues.length > 0);

      } catch (error) {
        console.error('Error fetching issues:', error);
      }
      setLoading(false);
    };

    // 초반에 빈화면일 때, 아래로 스크롤을 하면 첫번째 페이지부터 10개씩 이슈 목록이 표시됨. 
    const handleScroll = () => {
      if (
        listRef.current &&
        listRef.current.scrollTop + listRef.current.clientHeight >=
        listRef.current.scrollHeight
      ) {
        fetchIssues();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, hasMore, loading, setIssues]);

  const handleIssueItemClick = (issueNumber) => {
    setLoading(true);
    window.location.href = `/detail/${issueNumber}`;
  };

  return (
    <Container ref={listRef}>
      <Header organizationName="Angular" repositoryName="angular-cli" />
      <IssueList>
        {issues.map((issue) => (
          <React.Fragment key={issue.id}>
            {issue.id === issues[issues.length - 1].id && hasMore && (
              <LoadingSpinner key="loading-spinner" />
            )}
            {issue.id === issues[4].id && (
              <IssueItem key="advertisement">
                <AdvertisementBanner href="https://thingsflow.com/ko/home">
                  <AdvertisementImage src="/IMG_2126.jpg" alt="광고"/>
                </AdvertisementBanner>
              </IssueItem>
            )}
            <IssueItem
              key={issue.id}
              onClick={() => handleIssueItemClick(issue.issueNumber)}
            >
              <h3>#{issue.issueNumber} {issue.issueTitle}</h3>
              <p>작성자 {issue.authorLogin}, 작성일 {issue.createdAt} 코멘트: {issue.commentCount}</p>
            </IssueItem>
          </React.Fragment>
        ))}
      </IssueList>
      {loading && <LoadingSpinner />}
    </Container>
  );
};

export default ListPage;
