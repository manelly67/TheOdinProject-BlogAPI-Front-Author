import App from "../App";
import ErrorPage from "./error_page";
import SignUp from "./SignUp";
import Login from "./Login";

/*

 ROUTE LOGOUT
 REMOVE TOKEN IN LOCAL
REDIRIGIR despues de login hacia pagina inicial con posts

 ALGUNOS TEST
 COPIAR EL REPOSITORIO PAR EL SIGUIENTE FRONTEND
*/

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
];

export default routes;
