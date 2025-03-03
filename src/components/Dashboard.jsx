import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
   const location = useLocation();
    const { user, token } = location.state;
    console.log(user);
    console.log(token); 

    return (
        <>
         <Link to="/">HOME</Link>
         <p>RUTA PROTEGIDA REQUISITO USER LOGIN Y AUTOR</p>
        </>
       
    );

};

export default Dashboard;