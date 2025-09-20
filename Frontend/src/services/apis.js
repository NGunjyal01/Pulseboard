
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(import.meta.env.VITE_BASE_URL);

export const authEndpoints = {
    SIGNUP_API: BASE_URL + '/signup',
    LOGIN_API: BASE_URL + '/login',
    LOGOUT_API: BASE_URL + '/logout',
    VERIFY_API: BASE_URL + '/verify',
}

export const dashboardEndpoints = {
    CREATE_DASHBOARD_API: BASE_URL + '/dashboard/create',
    STEP1_API: BASE_URL + '/dashboard/step1/',
    UPLOAD_CSV_API: BASE_URL + '/dashboard/step2/upload-csv/',
    CONNECTAPI_API: BASE_URL + '/dashboard/step2/connectAPI/',
    SIMULATE_DATA_API: BASE_URL + '/dashboard/step2/simulate-data/',
    PUBLISH_DASHBOARD_API: BASE_URL + '/dashboard/publish/',
    GET_ALL_DASHBOARD_API: BASE_URL + '/dashboard/getAll',
    DELETE_DASHBOARD_API: BASE_URL + '/dashboard/delete/',
    GET_DASHBOARD_DETAILS_API: BASE_URL + '/dashboard/getDetails/',
    GET_COMMENTS_API: BASE_URL + '/dashboard/getComments/',
    GET_ANNOTATIONS_API: BASE_URL + '/dashboard/getAnnotations/',
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

export const teamsEndpoints = {
    GET_ALL_TEAMS_API: BASE_URL + '/teams/getAll',
    GET_TEAM_DETAILS_API: BASE_URL + '/teams/getDetails/',
    CREATE_TEAM_API: BASE_URL + '/teams/create',
    ADD_MEMBERS_API: BASE_URL + '/teams/addMembers',
    REMOVE_MEMBER_API: BASE_URL + '/teams/removeMember',
    SEND_INVITATION_API: BASE_URL + '/teams/sendInvite/',
    ACCEPT_INVITATION_API: BASE_URL + '/teams/acceptInvite/',
    REJECT_INVITATION_API: BASE_URL + '/teams/rejectInvite/',
    CANCEL_INVITATION_API: BASE_URL + '/teams/cancelInvite',
    GET_ALL_INVITATIONS_API: BASE_URL + '/teams/getAllInvitations',
}

export const settingsEndpoints = {
    UPDATE_PROFILE_API: BASE_URL + '/settings/updateProfile',
    UPDATE_EMAIL_API: BASE_URL + '/settings/updateEmail',
    UPDATE_PASSWORD_API: BASE_URL + '/settings/updatePassword',
}