import React from "react";

function Test() {
  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        background: "black",
        padding: 16,
        borderRadius: 10,
        width: 600,
        margin: "0 auto",
      }}
    >
      <ChildNodeFirst />
      <ChildNodeSecond />
    </div>
  );
}

const ChildNodeFirst = () => {
  return (
    <div>
      {Array(100).map((_, i) => (
        <div key={i} style={{ padding: 10 }}>
          {i}
        </div>
      ))}
    </div>
  );
};
function ChildNodeSecond() {
  return (
    <div
      style={{
        height: 500,
        borderRadius: 10,
        padding: 16,
        background: "white",
        width: "100%",
      }}
    >
      zxc penis
    </div>
  );
}

export default Test;
