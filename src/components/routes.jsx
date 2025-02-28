import App from "../App";
import ErrorPage from './error_page';
import SignUp from './SignUp';

const routes = [
  {
    index: true,
    path: "/",
    element: <App />,
    
    errorElement: <ErrorPage />,
  },
  {
    path: 'sign_up',
    element: <SignUp />,
  },
];

export default routes;
