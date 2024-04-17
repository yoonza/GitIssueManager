//Detailpage에 적용되는 Styled-component
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

export const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  width: 100%;
  max-width: 80%;
  border: 3px solid black;
  margin: 20px auto;
  height: 800px;
`;

export const IssueDetail = styled.div`
  margin-top: 1px;
  padding: 10px;
  max-height: 700px;
  overflow-y: auto;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #ddd;
`;

export const StyledMarkdown = styled(ReactMarkdown)`
  font-size: 14px;
`;

export const IssueTitle = styled.h3`
  font-size: 15px;
`;

export const IssueDescription = styled.p`
  margin-left: 10%;
  font-size: 12px;
`;