

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
