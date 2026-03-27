import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import LeftSideBar from "../LeftSideBar";

const Layout = () => {
  return (
    <>
      <Header />
      <LeftSideBar />

      {/* Main Content */}
      <main
        style={{
          marginLeft: "var(--spacing-sidebar)",
          paddingTop: "var(--spacing-header)",
          paddingBottom: "var(--spacing-footer)",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
