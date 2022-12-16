import { useState } from "react";

function ReadMore({ children, maxCahrCount = 100 }) {
  const text = `${children}`;

  const [isSliced, setIsSliced] = useState(true);
  const resultString = isSliced ? text.slice(0, maxCahrCount) : text;
  function toggleIsSliced() {
    setIsSliced(!isSliced);
  }
  return (
    <p>
      <p>{resultString}</p>
      <span onClick={toggleIsSliced}>
        {isSliced ? "Read More" : "Read Less"}
      </span>
    </p>
  );
}

export default ReadMore;
