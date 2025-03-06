import App from "../App";
import ErrorPage from "./error_page";
import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import NewPost from "./NewPost";
import MyWork from "./MyWork";


const routes = [
  {
    index: true,
    path: "/",
    element: <App />,

    errorElement: <ErrorPage />,
  },
  {
    path: "sign_up",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children:[
      {
        path: "new",
        element: <NewPost />,
      },
      {
        path: "my_work",
        element: <MyWork />,
      },
    ],
  },
 
];

export default routes;
