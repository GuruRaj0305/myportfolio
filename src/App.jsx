import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import "./App.css";
import Home from "./pages/home/Index";
import Layout from "./components/Layout";

const NotFound = lazy(() => import("./pages/NotFound"));
const ContactPage = lazy(() => import("./pages/contact/Index"));
const AboutPage = lazy(() => import("./pages/about/Index"));
const Experinece = lazy(() => import("./pages/experience/Index"));
const SkillsAndProject = lazy(() => import("./pages/skillsProjects/Index"));

const routeDefinations = createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />} >
      <Route index element={<Home />}  />
      <Route
        path="/about"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        }
      />
      <Route
        path="/experience"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Experinece />
          </Suspense>
        }
      />
      <Route
        path="/projects"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SkillsAndProject />
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ContactPage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
  </>
);

const routes = createBrowserRouter(routeDefinations);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
