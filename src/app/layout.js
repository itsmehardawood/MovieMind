"use client";
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

import { useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <title>MovieMind </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" type="image/png" />

      </head>
      <body className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
        {/* Back Button */}
        <button
  onClick={() => router.back()}
  className="fixed top-6 left-6 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition sm:top-4 sm:left-4"
>
  🔙 Back
</button>

        {/* Main Content */}
        <main className="flex-grow p-6">{children}</main>

       {/* Footer */}
       <footer className="bg-gray-900 text-gray-300 py-8 text-center mt-6 shadow-lg">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Name & Branding */}
        <p className="text-xl font-semibold text-white tracking-wide">
          Made with <span className="text-red-500">❤️</span> by 
          <span className="text-blue-400 font-bold"> Dawood Ayub</span>
        </p>
        
        <p className="text-sm text-gray-400">@itsmehardawood</p>

        {/* Social Links with Icons */}
        <div className="flex space-x-6 text-xl">
          <a
            href="https://github.com/itsmehardawood"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/itsmehardawood/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:mehar.dawood.official@gmail.com"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.instagram.com/itsmehardawood/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@itsmehardawood"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition transform hover:scale-110"
          >
            <FaTiktok />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Dawood Ayub. All rights reserved.
        </p>
      </div>
    </footer>

      </body>
    </html>
  );
}
