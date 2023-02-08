export default function SkeletonLoader() {
  return (
    <>
      <div className="w-full h-full border-2 rounded-md mx-auto mt-20">
        <svg
          width="auto"
          height="auto"
          viewBox="0 0 56 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Skeleton">
            <rect
              id="container"
              x="2"
              width="54"
              height="30"
              rx="1"
              fill="#D9D9D9"
            />
            <g id="blinker" filter="url(#filter0_d_1_8)">
              <ellipse
                id="Ellipse 1"
                cx="10.2174"
                cy="7.5"
                rx="5.4"
                ry="6"
                fill="#A29B9B"
              />
              <rect
                id="Rectangle 2"
                x="20.7826"
                y="3"
                width="29.113"
                height="2.5"
                rx="1.25"
                fill="#A19B9B"
              />
              <rect
                id="Rectangle 3"
                x="20.7826"
                y="7.5"
                width="29.5826"
                height="2.5"
                rx="1.25"
                fill="#A19B9B"
              />
              <rect
                id="Rectangle 5"
                x="20.7826"
                y="12"
                width="29.5826"
                height="2.5"
                rx="1.25"
                fill="#A19B9B"
              />
              <rect
                id="Rectangle 6"
                x="6.69565"
                y="17"
                width="44.1391"
                height="2.5"
                rx="1.25"
                fill="#A19B9B"
              />
              <path
                id="Rectangle 8"
                d="M6.69565 27.25C6.69565 26.5596 7.25529 26 7.94565 26H49.5848C50.2751 26 50.8348 26.5596 50.8348 27.25C50.8348 27.9404 50.2751 28.5 49.5848 28.5H7.94565C7.25529 28.5 6.69565 27.9404 6.69565 27.25Z"
                fill="#A19B9B"
              />
              <rect
                id="Rectangle 7"
                x="6.69565"
                y="21.5"
                width="44.1391"
                height="2.5"
                rx="1.25"
                fill="#A19B9B"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_1_8"
              x="0.817383"
              y="1.5"
              width="54.0174"
              height="35"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1_8"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1_8"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
}
