"use client";
export default function Footer() {
  const year: any = new Date().getFullYear();
  return (
    <>
      <footer className="footer footer-center mb-0 mt-auto p-4 base-content text-base-content">
        <div>
          <p>
            Copyright © 2023-{year} - All right reserved by Sledge Devs Team
          </p>
        </div>
      </footer>
    </>
  );
}
