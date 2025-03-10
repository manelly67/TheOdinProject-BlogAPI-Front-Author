import App from "../App";
import Details from "./Details";
import ErrorPage from "./error_page";
import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import NewPost from "./NewPost";
import MyWork from "./MyWork";
import Update from "./Update";


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
      {
        path: "update_post/:authorid/:postid",
        element: <Update />,
      },
    ],
  },
  {
    path: "posts/:authorid/:postid",
    element: <Details />,
  },
 
];

export default routes;
