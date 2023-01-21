export default function SkeletonLoader() {
    return (<>
        <div className="w-full h-full border-2 rounded-md mx-auto mt-20">
            <svg id="skeletom-container" viewBox="0 0 62 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Skeleton" filter="url(#filter0_d_1_8)">
                    <rect id="container" x="4" width="54" height="30" rx="1" fill="#D9D9D9" />
                    <g id="blinker" filter="url(#filter1_d_1_8)">
                        <ellipse id="Ellipse 1" cx="12.2174" cy="7.5" rx="5.4" ry="6" fill="#A29B9B" />
                        <rect id="Rectangle 2" x="22.7826" y="3" width="29.113" height="2.5" rx="1.25" fill="#A19B9B" />
                        <rect id="Rectangle 3" x="22.7826" y="7.5" width="29.5826" height="2.5" rx="1.25" fill="#A19B9B" />
                        <rect id="Rectangle 5" x="22.7826" y="12" width="29.5826" height="2.5" rx="1.25" fill="#A19B9B" />
                        <rect id="Rectangle 6" x="8.69565" y="17" width="44.1391" height="2.5" rx="1.25" fill="#A19B9B" />
                        <path id="Rectangle 8" d="M8.69565 27.25C8.69565 26.5596 9.25529 26 9.94565 26H51.5848C52.2751 26 52.8348 26.5596 52.8348 27.25V27.25C52.8348 27.9404 52.2751 28.5 51.5848 28.5H9.94565C9.25529 28.5 8.69565 27.9404 8.69565 27.25V27.25Z" fill="#A19B9B" />
                        <rect id="Rectangle 7" x="8.69565" y="21.5" width="44.1391" height="2.5" rx="1.25" fill="#A19B9B" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_1_8" x="0" y="0" width="62" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape" />
                    </filter>
                    <filter id="filter1_d_1_8" x="2.81738" y="1.5" width="54.0174" height="35" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape" />
                    </filter>
                </defs>
            </svg>

        </div>
    </>)
}