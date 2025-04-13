import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./mycomponent/Navbar";
import Footer from "./mycomponent/Footer";
import Home from "./mycomponent/Home";
import Login from "./mycomponent/othercomponent/Login";
import Signup from "./mycomponent/othercomponent/Signup";
import Logout from "./mycomponent/othercomponent/Logout";
import FindFood from "./mycomponent/othercomponent/FindFood";
import ListFood from "./mycomponent/othercomponent/ListFood";
import ProtectedRoute from "./mycomponent/othercomponent/Protectedroutes";
import PublicRoute from "./mycomponent/othercomponent/publicroute";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: (<PublicRoute><Login /></PublicRoute>), },
      { path: "/signup", element:(<PublicRoute><Signup /></PublicRoute>), },
      { path: "/find-food", element: (<ProtectedRoute><FindFood /></ProtectedRoute>), },
      { path: "/list-food", element: (<ProtectedRoute><ListFood /></ProtectedRoute>),},
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
