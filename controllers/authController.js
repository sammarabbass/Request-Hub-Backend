const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// signup
exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    let user=await User.findOne({email})

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    user = new User({ email, password: hashedpassword });
    await user.save();
    res.json({
      message: "Sigup Successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user doesnot exits " });
    }
    const ismatched = await bcrypt.compare(password, user.password);
    if (!ismatched) {
      return res.status(400).json({ message: "Invalid password " });
    }
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
      // refresh token
    );
    const refresh_token=jwt.sign(
      {id:user._id.toString(),role:user.role},
      process.env.REFRESH_SECRET,
      {expiresIn:"7d"}
    )
    user.refreshToken=refresh_token
    await user.save()
    res.json({ message: "login successful", user, accessToken ,refresh_token});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.refreshToken = async(req, res) =>{
    const {token} = req.body;
    if(!token){
        return res.status(401).json({message:"No Refresh Token"})
    }
    try{
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id)
        if(!user || user.refreshToken !== token){
            return res.status(403).json({message:"Invalid refresh Token"})
        }
        // creating new token
        const newAccessToken = jwt.sign(
            {id: user._id.toString(), role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        );
        res.json({accessToken:newAccessToken})
    }catch (err) {
    console.error("Refresh Error Detail:", err.message);
    
    // Optional: If you find out the token expired, clear it in DB
    if (err.name === 'TokenExpiredError') {
         // You can optionally decode the token to find the user and wipe user.refreshToken
    }
    
    return res.status(401).json({ message: "Invalid or Expired refresh Token" });
}
}
exports.getProfile = async (req, res) => {
  res.json({ message: "User Profile", user: req.user });
};
exports.roleCheck = async (req, res) => {
  res.json({ message: "Admin Dashobard" });
};

//  change password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // get user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // comparing old password with new password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "old password is incorrect" });
    }

    //validation of the password
    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atlest 6 characters" });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newPassword, salt);

    // updating the password
    user.password = hashedpassword;
    await user.save();
    res.json({ message: "Password change successfully" });
  } catch {
    res.status(500).json({ error: err.message });
  }
};

// forgotPassword
// 2 API

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
    await user.save();
   const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4, // IPv4 force
  connectionTimeout: 10000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
        // console.log(process.env.EMAIL_USER);
        // console.log(process.env.EMAIL_PASS);
        
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: "Password Reset Request",
  html: `
    <div style="
      margin: 0;
      padding: 40px 20px;
      background: #f1f5f9;
      font-family: Arial, Helvetica, sans-serif;
    ">

      <div style="
        max-width: 520px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 24px;
        overflow: hidden;
        border: 1px solid #e2e8f0;
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
      ">

        <!-- Header -->
        <div style="
          padding: 32px 30px;
          text-align: center;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
        ">

          <div style="
            width: 60px;
            height: 60px;
            margin: 0 auto 16px;
            border-radius: 16px;
            background: rgba(255,255,255,0.18);
            color: #ffffff;
            font-size: 22px;
            font-weight: bold;
            line-height: 60px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          ">
            SH
          </div>

          <h1 style="
            margin: 0;
            color: #ffffff;
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.5px;
          ">
            Service<span style="color: #bfdbfe;">Hub</span>
          </h1>

          <p style="
            margin: 8px 0 0;
            color: #dbeafe;
            font-size: 14px;
          ">
            Secure account recovery
          </p>

        </div>


        <!-- Content -->
        <div style="
          padding: 36px 32px;
          text-align: center;
        ">

          <div style="
            width: 56px;
            height: 56px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background: #eff6ff;
            color: #2563eb;
            font-size: 25px;
            line-height: 56px;
          ">
            🔐
          </div>

          <h2 style="
            margin: 0 0 12px;
            color: #0f172a;
            font-size: 24px;
            font-weight: 700;
          ">
            Password Reset
          </h2>

          <p style="
            margin: 0 auto 28px;
            max-width: 400px;
            color: #64748b;
            font-size: 15px;
            line-height: 1.7;
          ">
            We received a request to reset your ServiceHub password.
            Click the button below to create a new password.
          </p>


          <!-- Reset Button -->
          <a
            href="${resetLink}"
            style="
              display: inline-block;
              padding: 14px 30px;
              border-radius: 12px;
              background: #2563eb;
              color: #ffffff;
              font-size: 15px;
              font-weight: 700;
              text-decoration: none;
              box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
            "
          >
            Reset Password →
          </a>


          <!-- Security Notice -->
          <div style="
            margin-top: 30px;
            padding: 16px;
            border-radius: 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            text-align: left;
          ">

            <p style="
              margin: 0;
              color: #64748b;
              font-size: 13px;
              line-height: 1.6;
            ">
              🔒 For your security, this password reset link is temporary.
              If you did not request a password reset, you can safely ignore
              this email.
            </p>

          </div>

        </div>


        <!-- Footer -->
        <div style="
          padding: 20px 30px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          background: #f8fafc;
        ">

          <p style="
            margin: 0;
            color: #94a3b8;
            font-size: 12px;
          ">
            © ServiceHub · Secure Service Management
          </p>

        </div>

      </div>

    </div>
  `,
});
    res.json({
      message: "password reset link sent to your email",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// reset password

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: {
        $gt: Date.now(),
        // $gt
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or Expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    user.password = hashedpassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();
    res.json({
      message: "Password Reset Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


// logout 
