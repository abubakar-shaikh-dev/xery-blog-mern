import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/slices/authSlice";

// Partials
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";

//Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Categories from "./pages/Categories";
import ExploreCategory from "./pages/ExploreCategory";
import Blog from "./pages/Blog";
import Author from "./pages/Author";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/About";
import Search from "./pages/Search";
import PageNotFound from "./pages/404";

//Pages - Author Panl
import DashboardPanel from "./author_panel/pages/Dashboard.panel";
import BlogsPanel from "./author_panel/pages/Blogs.panel";
import ProfilePanel from "./author_panel/pages/Profile.panel";
import AddBlog from "./author_panel/pages/AddBlog.panel";
import EditBlog from "./author_panel/pages/EditBlog.panel";

//Middlewares
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import AuthRoutes from "./middlewares/AuthRoutes";

//Api
import { refreshToken } from "./services/api/api"

//Wrappers
function HeaderFooterWrapper({ children }) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}

const TokenRefreshInterval = 60 * 60 * 1000; // Refresh token every 60 minutes (adjust as needed)

export default function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    let intervalId;

    const refreshTokenHandler = async () => {
      try {
        if (isLoggedIn) {
          const refreshTokenFromStorage = localStorage.getItem('refreshToken');
          const response = await refreshToken(refreshTokenFromStorage);

          // Assuming the refreshToken function returns an object containing the new access token and refresh token
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);

          // isLoggedIn => TRUE
          dispatch(authActions.login());
        }
      } catch (error) {
        console.error('Token refresh failed:', error.message);
        // Handle the error as needed, e.g., log out the user or show an error message
      }
    };

    // Call the refresh token handler immediately upon mounting
    refreshTokenHandler();

    // Set up the interval to refresh the token periodically
    intervalId = setInterval(refreshTokenHandler, TokenRefreshInterval);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch, isLoggedIn]);

  return (
    <>
      
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderFooterWrapper><Home /></HeaderFooterWrapper>}/>
          <Route path="/explore" element={<HeaderFooterWrapper><Explore /></HeaderFooterWrapper>}/>
          <Route path="/categories" element={<HeaderFooterWrapper><Categories /></HeaderFooterWrapper>}/>
          <Route path="/categories/:category" element={<HeaderFooterWrapper><ExploreCategory /></HeaderFooterWrapper>}/>
          <Route path="/blog/:slug" element={<HeaderFooterWrapper><Blog /></HeaderFooterWrapper>}/>
          <Route path="/blog/author/:username" element={<HeaderFooterWrapper><Author /></HeaderFooterWrapper>} />
          <Route path="/about" element={<HeaderFooterWrapper><About /></HeaderFooterWrapper>} />
          <Route path="/search/:query" element={<HeaderFooterWrapper><Search /></HeaderFooterWrapper>} />

          //AUTH
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          //Author Panel          
          <Route element={<ProtectedRoutes />}>
            <Route path="/authorpanel/dashboard" element={<DashboardPanel />}/>
            <Route path="/authorpanel/profile" element={<ProfilePanel />}/>
            <Route path="/authorpanel/blogs" element={<BlogsPanel />}/>
            <Route path="/authorpanel/blogs/new" element={<AddBlog />}/>
            <Route path="/authorpanel/blogs/edit/:id" element={<EditBlog />}/>
          </Route>
          
          <Route path="*" element={<PageNotFound />} />
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
}
