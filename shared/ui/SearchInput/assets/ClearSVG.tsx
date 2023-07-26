import React from "react";

function ClearSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1732_22510)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.7123 3.78775C11.1783 4.25372 11.1783 5.00919 10.7123 5.47516L8.68746 7.49965L10.7123 9.52496C11.1783 9.99093 11.1783 10.7464 10.7123 11.2124C10.2463 11.6783 9.49087 11.6783 9.0249 11.2124L7.00001 9.18711L4.9751 11.2124C4.50913 11.6783 3.75366 11.6783 3.28769 11.2124C2.82172 10.7464 2.82173 9.99093 3.2877 9.52496L5.31255 7.49965L3.28768 5.47516C2.82172 5.00919 2.82172 4.25372 3.28769 3.78775C3.75366 3.32178 4.50913 3.32178 4.9751 3.78774L7 5.8122L9.0249 3.78776C9.49087 3.32179 10.2463 3.32178 10.7123 3.78775Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_1732_22510">
          <rect width="14" height="14" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ClearSvg;
