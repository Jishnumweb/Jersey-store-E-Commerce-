import {
    createBrowserRouter
  } from "react-router-dom";
import UserLayout from "../Layout/userLayout";
import Homepage from "../pages/Homepage";
import Registerpage from "../pages/Registerpage";
import Loginpage from "../pages/Loginpage";
import Productpage from "../pages/Productpage";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout/>,
      children:[{
        path:"",
        element:<Homepage/>
      },{
        path:"/register",
        element:<Registerpage/>
      },
      {
        path:"/login",
        element:<Loginpage/>
      },{
        path:"/shop",
        element:<Productpage/>
      }
    ]
    },
  ]);

 