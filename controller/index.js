const bcrypt = require("bcrypt");
const salt = 10;

// creating the sign up controller action

const User = require("../model/user");

// action

module.exports.signup = async (req, res) => {
  try {
    console.log("req.body", req.body);
    //1. get user data from req.body
    const { name, email, password, confirmPassword } = req.body;

    //2.check password and confirm password is same or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password and confirm password does not match",
        data: {},
      });
    }
    //3. check if user exist by given email or not
    const existingUser = await User.findOne({ email: email });
    // if found it return user details, else it will return null
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
        data: {},
      });
    }
    // using bycrypt
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log("hashedpasword", hashedPassword);
    //4. create user
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // 5. send the response
    return res.status(200).json({
      message: "User created sucesfuuly",
      data: {
        name: name,
        email: email,
      },
    });
  } catch (err) {
    // send error response
    console.log("error in sign up", err);
    return res.status(500).json({
      message: "Oops something went wrong",
      data: err,
    });
  }
};

// signin

module.exports.signIn = async (req, res) => {
  try {
    //1. fetch email and password from req.body
    console.log("req.body in sign in", req.body);
    const { email, password } = req.body;
    //2. fetch user data by using emailid
    const user = await User.findOne({ email: email });
    console.log("user", user);
    //3. check user exist or not
    if (!user) {
      return res.status(400).json({
        message: "Invalid email, please signup to use out platform",
        data: {},
      });
    }
    //4. comapre both the credentials
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "email/password doesnot match",
        data: {},
      });
    }
    return res.status(200).json({
      message: "Succesfull",
      data: { user: user.name },
    });
  } catch (err) {
    console.log("error in sign up", err);
    return res.status(500).json({
      message: "Oops something went wrong",
      data: err,
    });
  }
};
