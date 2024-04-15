import React, { createContext, useContext, useState } from 'react';

const SelectedIssueContext = createContext();

export const useSelectedIssue = () => useContext(SelectedIssueContext);

export const SelectedIssueProvider = ({ children }) => {
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <SelectedIssueContext.Provider value={{ selectedIssue, setSelectedIssue }}>
      {children}
    </SelectedIssueContext.Provider>
  );
};
