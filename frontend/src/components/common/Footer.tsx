"use client";

import Image, { ImageLoader } from "next/image";

import Link from "next/link";
import React from "react";

export const Footer = () => {
  const linkStyles = "text-sm transition duration-150 ease hover:text-white";
  const liStyles = "text-[#A1A1A1] my-1.5";

  return (
    <footer className="px-6 py-24 border-t border-solid pointer-events-auto bg-[#0A0A0A] border-[#242424]">
      <nav className="flex flex-wrap justify-around gap-5 mx-auto max-w-screen-2xl">
        <div className="flex flex-col items-center justify-center w-full max-w-xs gap-5">
          <div className="flex gap-3.5">
            <Link
              href="/"
              aria-label="Navigate to homepage with logo"
              className="aspect-square w-20 h-auto"
            >
              <Image
                alt="Company logo"
                src="/logo.webp"
                className="flex"
                width={90}
                height={90}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1154px) 33vw, (max-width: 1536px) 25vw, 20vw"
              />
            </Link>
            <span className="flex items-center text-sm text-[#A1A1A1]">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-3.5 justify-center">
            {/* <Link
              href="https://www.linkedin.com/in/marcospenelascamara/"
              target="_blank"
              title="LindedIn of Marcos"
            >
              <svg
                data-testid="geist-icon"
                height="24"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="24"
                style={{ color: "currentColor" }}
              >
                <path
                  id="Subtract"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM5 6.75V13H3V6.75H5ZM5 4.50008C5 5.05554 4.61409 5.5 3.99408 5.5H3.98249C3.38582 5.5 3 5.05554 3 4.50008C3 3.93213 3.39765 3.5 4.00584 3.5C4.61409 3.5 4.98845 3.93213 5 4.50008ZM8.5 13H6.5C6.5 13 6.53178 7.43224 6.50007 6.75H8.5V7.78371C8.5 7.78371 9 6.75 10.5 6.75C12 6.75 13 7.59782 13 9.83107V13H11V10.1103C11 10.1103 11 8.46616 9.7361 8.46616C8.4722 8.46616 8.5 9.93972 8.5 9.93972V13Z"
                ></path>
              </svg>
            </Link> */}
            <Link
              href="https://www.instagram.com/miraclefiitness"
              target="_blank"
              title="Instagram of Mircle Fitness"
            >
              <svg id="geist-icon" fill="rgb(217, 50, 117)" version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="24" strokeLinejoin="round"
                viewBox="0 0 169.063 169.063" style={{ color: "currentColor" }}>
                <g>
                  <path id="Subtract"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor" d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
                          c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
                          c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
                          c17.455,0,31.656,14.201,31.656,31.655V122.407z" />
                  <path id="Subtract"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor" d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
                          C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
                          c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z" />
                  <path id="Subtract"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor" d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
                          c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
                          C135.661,29.421,132.821,28.251,129.921,28.251z" />
                </g>
              </svg>
            </Link>



            {/* <Link
              href="https://github.com/MarcosCamara01"
              target="_blank"
              title="GitHub of Marcos"
            >
              <svg
                data-testid="geist-icon"
                height="24"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="24"
                style={{ color: "currentColor" }}
              >
                <g clipPath="url(#clip0_872_3147)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_872_3147">
                    <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link
              href="https://medium.com/@marcoscamara"
              target="_blank"
              title="Medium of Marcos"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M180.5,74.262C80.813,74.262,0,155.633,0,256S80.819,437.738,180.5,437.738,361,356.373,361,256,280.191,74.262,180.5,74.262Zm288.25,10.646c-49.845,0-90.245,76.619-90.245,171.095s40.406,171.1,90.251,171.1,90.251-76.619,90.251-171.1H559C559,161.5,518.6,84.908,468.752,84.908Zm139.506,17.821c-17.526,0-31.735,68.628-31.735,153.274s14.2,153.274,31.735,153.274S640,340.631,640,256C640,171.351,625.785,102.729,608.258,102.729Z"></path>
              </svg>
            </Link> */}
          </div>
        </div>
        {/* <div className="w-full max-w-xs">
            <h2 className="my-3 text-sm font-medium">Products</h2>
            <ul className="grid grid-cols-2">
              <li className={liStyles}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/t-shirts`}
                  className={linkStyles}
                >
                  Gada
                </Link>
              </li>
              <li className={liStyles}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/pants`}
                  className={linkStyles}
                >
                  Dumbell
                </Link>
              </li>
              <li className={liStyles}>
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/sweatshirts`}
                  className={linkStyles}
                >
                  Carpet
                </Link>
              </li>
            </ul>
          </div> */}
        {/* <div className="w-full max-w-xs">
            <h2 className="my-3 text-sm font-medium">Assistance</h2>
            <ul className="grid grid-cols-2">
              <li className={liStyles}>
                <Link href="#" className={linkStyles}>
                  Size guide
                </Link>
              </li>
              <li className={liStyles}>
                <Link href="#" className={linkStyles}>
                  Delivery
                </Link>
              </li>
              <li className={liStyles}>
                <Link href="#" className={linkStyles}>
                  Returns and refunds
                </Link>
              </li>
            </ul>
          </div> */}
        {/* <div className="w-full max-w-xs">
            <h2 className="my-3 text-sm font-medium">About Marcos</h2>
            <ul className="grid grid-cols-2">
              <li className={liStyles}>
                <Link
                  href="https://portfoliomarcos.com/"
                  target="_blank"
                  className={linkStyles}
                >
                  Portfolio
                </Link>
              </li>
              <li className={liStyles}>
                <Link
                  href="https://www.linkedin.com/in/marcospenelascamara/"
                  target="_blank"
                  className={linkStyles}
                >
                  LinkedIn
                </Link>
              </li>
              <li className={liStyles}>
                <Link
                  href="https://github.com/MarcosCamara01"
                  target="_blank"
                  className={linkStyles}
                >
                  GitHub
                </Link>
              </li>
              <li className={liStyles}>
                <Link
                  href="https://medium.com/@marcoscamara"
                  target="_blank"
                  className={linkStyles}
                >
                  Medium
                </Link>
              </li>
            </ul>
          </div> */}
      </nav>
    </footer>
  );
};
