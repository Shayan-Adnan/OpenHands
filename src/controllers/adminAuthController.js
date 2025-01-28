const adminAuthService = require("../services/adminAuthService");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { admin, token } = await adminAuthService.loginAdmin(email, password);

    res.cookie("jwt", token, {
      httpOnly: true, //cannot access it from frontend
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds,
    });

    res.status(200).json({ message: "Login successful.", token }); //should remove this message and token from this json - user doesnt need to see this - only for testing
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
module.exports = { loginAdmin };
