import { createContext, useContext, useEffect, useState } from "react";
import * as fileService from "../services/fileService";

const FileContext = createContext();

export function FileProvider({ children }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(fileService.getFiles());
  }, []);

  const addFile = (file) => {
    fileService.addFile(file);
    setFiles(fileService.getFiles());
  };

  const deleteFile = (id) => {
    fileService.deleteFile(id);
    setFiles(fileService.getFiles());
  };

  return (
    <FileContext.Provider
      value={{
        files,
        addFile,
        deleteFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export const useFile = () => useContext(FileContext);