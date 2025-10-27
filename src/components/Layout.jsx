// Author: Gururaj
// Created: 23rd May 2025
// Description: Main layout for inner app(once login ), which wraps sidebar and topbar.
// Version: 1.0.0
// components/Layout.jsx
// Modified: 

import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import CustomCursor from "./Cursor";
import ScrollToTop from "./custom/ScrollToTop ";


export default function Layout() {

  return (
    <>
        
        <CustomCursor />
        <ScrollToTop />
       
        <Header />
         <Outlet /> 
           
         
    </>
  );
}
