import React from "react";

const FilePreview = ({ file }) => {


  if (!file) return null;
  // if (file.type === "image") {
  //   return <img src={file.url} width="150" alt={file.originalName} />;
  // }
  if (file.type === "video") {
    return <video src={file.url} width="250" controls />;
  }

  return (
   <div>
  <a
    href={file.url}
    target="_blank"
    rel="noreferrer"
    className="inline-block cursor-pointer text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
  >
    {file.originalName}
  </a>
</div>
  );
};

export default FilePreview;
