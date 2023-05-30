export function Logo(): JSX.Element {
  return (
    <div className="flex items-center justify-center gap-1">
      <svg className="w-6 h-6" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_10_2)">
          <path
            d="M25.76 34.08H13.68V12C13.68 9.97333 14.2667 8.4 15.44 7.28C16.6133 6.10666 18.1867 5.52 20.16 5.52C21.28 5.52 22.3467 5.6 23.36 5.76C24.4267 5.92 25.2267 6.05333 25.76 6.16V34.08ZM20 35.92V26.16H44.08C44.4 26.6933 44.6933 27.3867 44.96 28.24C45.2267 29.04 45.36 29.92 45.36 30.88C45.36 32.5867 44.96 33.8667 44.16 34.72C43.4133 35.52 42.3733 35.92 41.04 35.92H20ZM20.16 15.28V5.52H46.8C47.12 6 47.4133 6.66667 47.68 7.52C47.9467 8.37333 48.08 9.28 48.08 10.24C48.08 11.9467 47.68 13.2267 46.88 14.08C46.1333 14.88 45.0933 15.28 43.76 15.28H20.16ZM13.68 29.36H25.84V53.92C25.36 54.08 24.5867 54.2133 23.52 54.32C22.4533 54.48 21.36 54.56 20.24 54.56C17.84 54.56 16.1333 54.1333 15.12 53.28C14.16 52.4267 13.68 50.96 13.68 48.88V29.36Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_10_2">
            <rect width="60" height="60" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span className="font-bold text-2xl">FaceReg</span>
    </div>
  );
}
