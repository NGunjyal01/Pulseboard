
const BASE_URL = "http://localhost:4444";

export const authEndpoints = {
    SIGNUP_API: BASE_URL + '/signup',
    LOGIN_API: BASE_URL + '/login',
    LOGOUT_API: BASE_URL + '/logout',
    VERIFY_API: BASE_URL + '/verify',
}

export const dashboardEndpoints = {
    CREATE_DASHBOARD_API: BASE_URL + '/dashboard/create',
    STEP1_API: BASE_URL + '/dashboard/step1',
    UPLOAD_CSV_API: BASE_URL + '/dashboard/step2/upload-csv',
    CONNECTAPI_API: BASE_URL + '/dashboard/step2/connectAPI',
    SIMULATE_DATA_API: BASE_URL + '/dashboard/step2/simulate-data',
    PUBLISH_DASHBOARD_API: BASE_URL + '/dashboard/publish',
    GET_ALL_DASHBOARD_API: BASE_URL + '/dashboard/getAll'
}

export const friendsEndpoints = {
    GET_ALL_FRIENDS_API: BASE_URL + '/friends/getAll',
    REMOVE_FRIEND_API: BASE_URL + '/friends/remove',
    SEND_REQUEST_API: BASE_URL + '/friendRequest/send/',
    CANCEL_REQUEST_API: BASE_URL + '/friendRequest/cancel/',
    ACCEPT_REQUEST_API: BASE_URL + '/friendRequest/accept/',
    REJECT_REQUEST_API: BASE_URL + '/friendRequest/reject/',
    GET_INCOMING_REQUEST_API: BASE_URL + '/friendRequest/incoming',
    GET_OUTGOING_REQUEST_API: BASE_URL + '/friendRequest/outgoing',
}