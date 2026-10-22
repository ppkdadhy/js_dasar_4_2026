import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import pool from "../config/db.js";

export const login = async (req, res) => {
  // const email = req.body.email;
  const { email, password } = req.body;

  if (!email || !password) {
    // 400: bad response (browser)
    // 500: server error (server/database)
    // 200 : success (success)
    res.status(400).json({
      status: false,
      message: "Email atau password required",
    });
  }

  //   find()
  // const user = USERS.find((u) => u.email === email && u.password === password);

  const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email= ?", [email]);
  console.log(user);
  // email : unik

  if (user.length === 0) {
    return res.status(401).json({
      status: false,
      message: "Invalid credential",
    });
  }

  const dataUser = user[0];
  const isMatch = await bcrypt.compare(password, dataUser.password);

  if (!isMatch) {
    //401 : unauthorize : login gagal
    return res.status(401).json({
      status: false,
      message: "Invalid credential",
    });
  }

  const token = jwt.sign(
    {
      id: dataUser.id,
      nama: dataUser.name,
      email: dataUser.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );

  res.status(200).json({
    status: true,
    message: "Login success",
    data: {
      user: {
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
      },
      token,
    },
  });
};

export const me = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query("SELECT id, name, email FROM users WHERE id =?", [userId]);
    return res.status(200).json({
      status: true,
      data: rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
