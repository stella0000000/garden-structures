import React, { useState } from "react";

const Node = ({ value }: { value: number }) => {
  return (
    <div>
      <p>Node: {value}</p>
    </div>
  );
};

export default Node;
