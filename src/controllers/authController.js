const authService = require("../services/authService");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res.cookie("jwt", token, {
      httpOnly: true, //cannot access it from frontend
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds,
    });

    res.status(200).json();
  } catch (error) {
    console.log(error.statusCode);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const signUpUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, country, city } =
      req.body;
    await authService.signUpUser(
      firstName,
      lastName,
      username,
      email,
      password,
      country,
      city
    );
    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

module.exports = { loginUser, signUpUser, logout };
