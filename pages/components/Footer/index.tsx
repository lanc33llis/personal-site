import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex w-full justify-center gap-8 my-12">
      <Link href="https://github.com/lanc33llis">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32.58 31.77"
          width={32}
          height={32}
          className="fill-gray-500 hover:fill-black cursor-pointer"
        >
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path d="M16.29,0a16.29,16.29,0,0,0-5.15,31.75c.82.15,1.11-.36,1.11-.79s0-1.41,0-2.77C7.7,29.18,6.74,26,6.74,26a4.36,4.36,0,0,0-1.81-2.39c-1.47-1,.12-1,.12-1a3.43,3.43,0,0,1,2.49,1.68,3.48,3.48,0,0,0,4.74,1.36,3.46,3.46,0,0,1,1-2.18c-3.62-.41-7.42-1.81-7.42-8a6.3,6.3,0,0,1,1.67-4.37,5.94,5.94,0,0,1,.16-4.31s1.37-.44,4.48,1.67a15.41,15.41,0,0,1,8.16,0c3.11-2.11,4.47-1.67,4.47-1.67A5.91,5.91,0,0,1,25,11.07a6.3,6.3,0,0,1,1.67,4.37c0,6.26-3.81,7.63-7.44,8a3.85,3.85,0,0,1,1.11,3c0,2.18,0,3.94,0,4.47s.29.94,1.12.78A16.29,16.29,0,0,0,16.29,0Z" />
            </g>
          </g>
        </svg>
      </Link>
      <Link href="https://www.linkedin.com/in/lance-ellis/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 350.81 354.96"
          width={32}
          height={32}
          className="fill-gray-500 hover:fill-black cursor-pointer"
        >
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path d="M315.44,355a35.43,35.43,0,0,0,35.37-35.49v-284A35.43,35.43,0,0,0,315.44,0H35.37A35.43,35.43,0,0,0,0,35.49v284A35.43,35.43,0,0,0,35.37,355Z" />
              <path
                fill="white"
                d="M101.55,78.86c-13,0-21.53,8.77-21.53,20.2,0,11.16,8.24,20.2,21,20.2,13.55,0,21.79-9,21.79-20.2C122.55,87.63,114.57,78.86,101.55,78.86Z"
              />
              <rect
                fill="white"
                x="81.08"
                y="135.21"
                width="40.4"
                height="129.98"
              />
              <path
                fill="white"
                d="M269,265.19V188.37c0-38.27-19.94-56.08-46.52-56.08-21.79,0-34.82,12.49-40.13,21h-.8l-1.86-18.08H144.6c.53,11.7,1.06,25.25,1.06,41.47v88.51h40.4v-75c0-3.72.27-7.44,1.33-10.1C190.32,172.69,197,165,208.13,165c14.62,0,20.47,11.43,20.47,28.18v72Z"
              />
            </g>
          </g>
        </svg>
      </Link>
    </div>
  );
};

export default Footer;
