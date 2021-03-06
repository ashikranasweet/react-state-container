import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContext } from "./context/UserContext";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import BlogDetails from "./pages/BlogsPage/BlogDetails";
import Blogs from "./pages/BlogsPage/Blogs";
import UpdateBlog from "./pages/BlogsPage/UpdateBlog";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Posts from "./pages/PostsPage/Posts";

const client = new QueryClient();

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Navigation user={user} />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blog/:blogId" element={<BlogDetails />} />
          <Route path="/blog/:blogId/update" element={<UpdateBlog />} />
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="/analytics"
            element={
              <ProtectedRoute
                isAllowed={!!user && user?.permission?.includes("analyze")}
              >
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                isAllowed={!!user && user?.roles?.includes("admin")}
              >
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/posts" element={<Posts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
