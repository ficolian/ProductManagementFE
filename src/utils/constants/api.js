export const API_BASE_URL = process.env.REACT_APP_API_URL
export const CUSTOMER_SITE_URL = process.env.REACT_APP_CUSTOMER_URL


// SEQ Architect
// Auth
export const ApiLogin = {
	method: 'post',
	url: '/api/Auth/Login'
}
export const ApiCheckAuth = {
	method: 'post',
	url: 'api/Auth/CheckAuth'
}
export const ApiRegister = {
	method: 'post',
	url: 'api/Auth/Register'
}

// Kost
export const ApiInsertKost = {
	method: 'post',
	url: '/api/product/create'
}
export const ApiUpdateKost = {
	method: 'put',
	url: '/api/product/update'
}
export const ApiDeleteKost = {
	method: 'delete',
	url: '/api/product/delete'
}
export const ApiGetKostById = (id) => ({
	method: 'get',
	url: `/api/product/detail/${id}`
});
export const ApiGetKostList = {
	method: 'post',
	url: '/api/product/find'
}

// System Setting
export const ApiInsertSystemSetting = {
	method: 'post',
	url: '/api/SystemSetting/InsertSystemSetting'
}
export const ApiUpdateSystemSetting = {
	method: 'post',
	url: '/api/SystemSetting/UpdateSystemSetting'
}
export const ApiDeleteSystemSetting = {
	method: 'post',
	url: '/api/SystemSetting/DeleteSystemSetting'
}
export const ApiGetSystemSettingById = {
	method: 'post',
	url: '/api/SystemSetting/GetSystemSettingById'
}
export const ApiGetSystemSettingList = {
	method: 'post',
	url: '/api/SystemSetting/GetSystemSettingList'
}

// Room Type
export const ApiInsertRoomType = {
   method: 'post',
	url: '/api/RoomType/InsertRoomType'
}
export const ApiUpdateRoomType = {
   method: 'post',
	url: '/api/RoomType/UpdateRoomType'
}
export const ApiDeleteRoomType = {
   method: 'post',
	url: '/api/RoomType/DeleteRoomType'
}
export const ApiGetRoomTypeById = {
   method: 'post',
	url: '/api/RoomType/GetRoomTypeById'
}

// Room
export const ApiUpdateRoom = {
   method: 'post',
	url: '/api/Room/UpdateRoom'
}
export const ApiGetRoomByKostId = {
   method: 'post',
	url: '/api/Room/GetRoomByKostId'
}

// Tenant
export const ApiInsertTenant = {
	method: 'post',
	url: '/api/Tenant/InsertTenant'
}
export const ApiUpdateTenant = {
	method: 'post',
	url: '/api/Tenant/UpdateTenant'
}
export const ApiDeleteTenant = {
	method: 'post',
	url: '/api/Tenant/DeleteTenant'
}
export const ApiGetTenantById = {
	method: 'post',
	url: '/api/Tenant/GetTenantById'
}
export const ApiGetTenantList = {
	method: 'post',
	url: '/api/Tenant/GetTenantList'
}


// Booking
export const ApiInsertBooking = {
	method: 'post',
	url: '/api/Booking/InsertBooking'
}
export const ApiUpdateBooking = {
	method: 'post',
	url: '/api/Booking/UpdateBooking'
}
export const ApiGetBookingTenant = {
	method: 'post',
	url: '/api/Booking/GetBookingTenant'
}
export const ApiGetBookingRoom = {
	method: 'post',
	url: '/api/Booking/GetBookingRoom'
}
export const ApiGetBookingList = {
	method: 'post',
	url: '/api/Booking/GetBookingList'
}
export const ApiGetBookingById = {
	method: 'post',
	url: '/api/Booking/GetBookingById'
}