import React from "react";
import { calcStats } from "../../utils/salesHelper";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <span className="footer-text">v1.0 · POS System</span>
        <span className="footer-text-dim">
          © 2026 Malik Burge Point — All rights reserved
        </span>
        <div className="footer-status">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>System Online</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
