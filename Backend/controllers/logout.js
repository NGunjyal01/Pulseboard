
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
        httpOnly: true,
        secure: false,   // must match login
        sameSite: "lax",
        path: "/",       // important for clearing
        });

        return res.status(200).json({
        success: true,
        message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

module.exports = logout;