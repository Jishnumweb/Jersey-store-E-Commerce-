import {
  createBrowserRouter
} from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";

import Homepage from "../pages/Homepage";
import Registerpage from "../pages/Registerpage";
import Loginpage from "../pages/Loginpage";
import Productpage from "../pages/Productpage";
import Admindashboard from "../pages/Adminpage/Admindashboard";
import Sellerdashboard from "../pages/sellerPage/Sellerdashboard";
import Cartpage from "../pages/Cartpage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Sellerlayout from "../Layout/Sellerlayout";
import AddProductPage from "../pages/sellerPage/AddProductPage";
import ViewProductPage from "../pages/sellerPage/ViewProductPage";
import SellerEditPage from "../pages/sellerPage/SellerEditPage";
import Adminlayout from "../Layout/Adminlayout";
import AllproductAdmin from "../pages/Adminpage/AllproductAdmin";
import Viewuserspage from "../pages/Adminpage/Viewuserspage";
import AllSellers from "../pages/Adminpage/AllSellers";
import AddProductAdmin from "../pages/Adminpage/AddProductAdmin";
import Checkout from "../pages/Checkout";
import OrderPage from "../pages/OrderPage";
import Success from "../pages/Success";
import MyOrders from "../pages/MyOrderpage";
import Allorders from "../pages/Adminpage/Allorders";
import OrderDetails from "../pages/Adminpage/OrderDetails";
import UserLayout from "../Layout/Userlayout";
import Editproductadmin from "../pages/Adminpage/Editproductadmin";


export const router = createBrowserRouter([

  // USER ROUTES

  {
    path: "/",
    element: <UserLayout/>,
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
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute authUser="user">
          <Checkout/>
        </ProtectedRoute>
      )
    },
    {
      path: "/success",
      element: (
        <ProtectedRoute authUser="user">
          <OrderPage/>
        </ProtectedRoute>
      )
    },
    {
      path: "/payment/success",
      element: (
        <ProtectedRoute authUser="user">
          <Success/>
        </ProtectedRoute>
      )
    },
    {
      path: "/my-orders",
      element: (
        <ProtectedRoute authUser="user">
          <MyOrders/>
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
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute authRoles="admin">
            <AddProductAdmin/>
          </ProtectedRoute>
        )
      },
      {
        path:"view-all-products",
        element:(
          <ProtectedRoute authUser="admin">
            <AllproductAdmin/>
          </ProtectedRoute>
        )
      },
      {
        path:"edit-product/:id",
        element:(
          <ProtectedRoute authUser="admin">
            <Editproductadmin/>
          </ProtectedRoute>
        )


      },
        {
        path:"view-all-users",
        element:(
          <ProtectedRoute authUser="admin">
            <Viewuserspage/>
          </ProtectedRoute>
        )
      },{
        path:"view-all-sellers",
        element:(
          <ProtectedRoute authUser="admin">
            <AllSellers/>
          </ProtectedRoute>
        )
      },{
        path:"all-orders",
        element:(
          <ProtectedRoute authUser="admin">
            <Allorders/>
          </ProtectedRoute>
        )
      },{
        path:"order-details/:id",
        element:(
          <ProtectedRoute authUser="admin">
            <OrderDetails/>
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
          <ProtectedRoute authRoles="seller">
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