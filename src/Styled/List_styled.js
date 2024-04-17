// Styled/List_styled.js

import styled from 'styled-components';

export const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  width: 100%; 
  max-width: 80%; 
  height: 800px;
  border: 3px solid black;
  margin: 20px auto;
`;

export const IssueList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  overflow-y: auto;
  max-height: 700px;
`;

export const IssueItem = styled.li`
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 12px;
  cursor: pointer; 
`;


export const AdvertisementBanner = styled.a`
  display: block;
  width: 100%; // IssueList의 너비에 맞추기
`;

export const AdvertisementImage = styled.img`
width: 100%; // 이미지의 너비를 100%로 설정하여 부모 요소에 맞춤
max-height: 100%; // 이미지의 최대 높이를 100%로 설정하여 부모 요소에 맞춤
`;
