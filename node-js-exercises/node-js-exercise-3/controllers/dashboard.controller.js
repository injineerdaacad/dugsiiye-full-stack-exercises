export const adminDashboard = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the admin dashboard",
        user: req.user,
    });
};


export const userDashboard = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the user dashboard",
        user: req.user,
    });
};
