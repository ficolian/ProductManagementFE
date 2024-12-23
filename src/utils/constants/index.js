// import ChangeAccount from "pages/ChangeAccount";
import CommonSetting from "pages/CommonSetting/CommonSetting"
import CommonSettingForm from "pages/CommonSetting/CommonSettingForm"
import Expense from "pages/Expense/Expense"
import ExpenseCategory from "pages/ExpenseCategory/ExpenseCategory"
import Home from "pages/Home"
import Income from "pages/Income/Income"
import IncomeCategory from "pages/IncomeCategory/IncomeCategory"
import Kost from "pages/Kost/Kost"
import KostForm from "pages/Kost/KostForm"
import Booking from "pages/KostPages/Booking/Booking"
import BookingForm from "pages/KostPages/Booking/BookingForm"
import Dashboard from "pages/KostPages/Dashboard/Dashboard"
import KostSetting from "pages/KostPages/KostSetting/KostSetting"
import RoomSetting from "pages/KostPages/KostSetting/RoomSetting"
import RoomTypeSetting from "pages/KostPages/KostSetting/RoomType"
import Payment from "pages/KostPages/Payment/Payment"
import PaymentForm from "pages/KostPages/Payment/PaymentForm"
import Room from "pages/KostPages/Room/Room"
import Tenant from "pages/KostPages/Tenant/Tenant"
import TenantForm from "pages/KostPages/Tenant/TenantForm"
import Login from "pages/Login"
import Product from "pages/Product/Product"
import ProductForm from "pages/Product/ProductForm"
import Setting from "pages/Setting"
import SystemSetting from "pages/SystemSetting/SystemSetting"
import SystemSettingForm from "pages/SystemSetting/SystemSettingForm"


export const routes = [
   {
      path: "/login",
      element: <Login />
   },
   {
      path: "/",
      element: <Home />
   },
   {
      path: "/kost-list",
      element: <Kost />
   },
   {
      path: "/kost-list/form",
      element: <KostForm />
   },

   {
      path: "/setting",
      element: <Setting />
   },
   {
      path: "/setting/system-setting",
      element: <SystemSetting />
   },
   {
      path: "/setting/system-setting/form",
      element: <SystemSettingForm />
   },


   {
      path: "/kost/dashboard",
      element: <Dashboard />
   },

   {
      path: "/kost/setting",
      element: <KostSetting />
   },
   {
      path: "/kost/setting/room-type",
      element: <RoomTypeSetting />
   },
   {
      path: "/kost/setting/room-setting",
      element: <RoomSetting />
   },

   {
      path: "/kost/tenant",
      element: <Tenant />
   },
   {
      path: "/kost/tenant/form",
      element: <TenantForm />
   },

   {
      path: "/kost/room",
      element: <Room />
   },

   {
      path: "/kost/booking",
      element: <Booking />
   },
   {
      path: "/kost/booking/form",
      element: <BookingForm />
   },

   {
      path: "/kost/payment",
      element: <Payment />
   },
   {
      path: "/kost/payment/form",
      element: <PaymentForm />
   },


   {
      path: "/product",
      element: <Product />
   },
   {
      path: "/product/form",
      element: <ProductForm />
   },
]

export const ROLE_ADMIN = "admin"
export const ROLE_OWNER = "owner"