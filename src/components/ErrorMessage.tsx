import React from "react";

const ErrorMessage = ({ error }: { error: string | null }) => {
  // need to use proper destructuring
  return <div>{error}</div>;
};

export default ErrorMessage;
