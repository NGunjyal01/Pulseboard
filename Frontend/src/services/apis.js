
const BASE_URL = "http://localhost:4444";

export const authEndpoints = {
    SIGNUP_API: BASE_URL + '/signup',
    LOGIN_API: BASE_URL + '/login',
    LOGOUT_API: BASE_URL + '/logout'
}

export const dashboardEndpoints = {
    CREATE_DASHBOARD_API: BASE_URL + '/dashboard/create',
    STEP1_API: BASE_URL + '/dashboard/step1',
    UPLOAD_CSV_API: BASE_URL + '/dashboard/step2/upload-csv',
    CONNECTAPI_API: BASE_URL + '/dashboard/step2/connectAPI',
    SIMULATE_DATA_API: BASE_URL + '/dashboard/step2/simulate-data',
}