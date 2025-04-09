import {
  createBrowserRouter
} from "react-router-dom";
import UserLayout from "../Layout/userLayout";
import Homepage from "../pages/Homepage";
import Registerpage from "../pages/Registerpage";
import Loginpage from "../pages/Loginpage";
import Productpage from "../pages/Productpage";
import Admindashboard from "../pages/Adminpage/Admindashboard";
import Sellerdashboard from "../pages/sellerPage/Sellerdashboard";
import Cartpage from "../pages/Cartpage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import { ProtectedRoute } from "../components/protectedRoute";
import Sellerlayout from "../Layout/Sellerlayout";
import AddProductPage from "../pages/sellerPage/AddProductPage";
import ViewProductPage from "../pages/sellerPage/ViewProductPage";
import SellerEditPage from "../pages/sellerPage/SellerEditPage";
import Adminlayout from "../Layout/Adminlayout";
import AllproductAdmin from "../pages/Adminpage/AllproductAdmin";
import Viewuserspage from "../pages/Adminpage/Viewuserspage";


export const router = createBrowserRouter([

  // USER ROUTES

  {
    path: "/",
    element: <UserLayout />,
    children: [{
      path: "",
      element: <Homepage />
    }, {
      path: "/register",
      element: <Registerpage />
    },
    {
      path: "/login",
      element: <Loginpage />
    }, {
      path: "shop",
      element: (
        <ProtectedRoute authUser="user">
          <Productpage />
        </ProtectedRoute>
      )
    }, {
      path: "/cart",
      element: (
        <ProtectedRoute authUser="user">
          <Cartpage />
        </ProtectedRoute>
      )
    },
    {
      path: "/view-product/:id",
      element: (
        <ProtectedRoute authUser="user">
          <ProductDetailsPage />
        </ProtectedRoute>
      )
    }
    ]
  },

  // ADMIN ROUTES

  {
    path: "/admin",
    element: <Adminlayout />,
    children:[
      {
        path:"",
        element:(
          <ProtectedRoute authUser="admin">
            <Admindashboard/>
          </ProtectedRoute>
        )
      },{
        path:"view-all-products",
        element:(
          <ProtectedRoute authUser="admin">
            <AllproductAdmin/>
          </ProtectedRoute>
        )
      },{
        path:"view-all-users",
        element:(
          <ProtectedRoute authUser="admin">
            <Viewuserspage/>
          </ProtectedRoute>
        )
      }
      
    ]
  },

  // SELLER ROUTES

  {
    path: "/seller",
    element: <Sellerlayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute authUser="seller">
            <Sellerdashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute authUser="seller">
            <AddProductPage />
          </ProtectedRoute>
        )
      }, {
        path: "view-product",
        element: (
          <ProtectedRoute authUser="seller">
            <ViewProductPage />
          </ProtectedRoute>
        )
      }, {
        path: "edit-product/:id",
        element: (
          <ProtectedRoute authUser="seller">
            <SellerEditPage/>
          </ProtectedRoute>
        )
      }

    ]
  }
]);







// {
//   path:"/shop",
//   element: <Productpage/>
// },{
//   path:"/cart",
//   element:<Cartpage/>
// },{
//   path:"/view-product/:id",
//   element:<ProductDetailsPage/>
// }