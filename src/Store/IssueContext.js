import React, { createContext, useContext, useState } from 'react';

const IssueContext = createContext();

export const useIssueContext = () => useContext(IssueContext);

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);

  return (
    <IssueContext.Provider value={{ issues, setIssues }}>
      {children}
    </IssueContext.Provider>
  );
};
