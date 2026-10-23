import pool from "../config/db.js";
const USERS = [
  {
    id: 1,
    nama: "Reza",
    email: "admin@gmail.com",
    password: "12345678",
  },

  {
    id: 2,
    nama: "Ratna",
    email: "ratna@gmail.com",
    password: "12345678",
  },
  {
    id: 3,
    nama: "Laras",
    email: "laras@gmail.com",
    password: "12345678",
  },
];

// crud (create, read, update, delete)

// read
export const getAllUser = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
    return res.status(200).json({
      status: true,
      message: "Fetch user success",
      total: rows.length,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Fail Fetch user",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id); //1
    // find
    const [user] = await pool.query("SELECT id, name, email, is_active FROM users WHERE id= ?", [id]);

    res.status(200).json({
      status: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Fail Fetch user",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  //   const name = req.body.name;
  //   const password = req.body.password;

  try {
    const [user] = await pool.query("INSERT INTO users(name,email,password) VALUES(?,?,?)", [name, email, password]);

    return res.status(201).json({
      status: true,
      message: "Create user success",
      data: { id: user.insertId, name, email },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Create user failed",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, password, is_active } = req.body;
    let update = "";

    if (!password) {
      update = await pool.query("UPDATE users SET name=?, email=?, is_active=? WHERE id=?", [name, email, is_active, id]);
    } else {
      update = pool.query("UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?", [name, email, password, is_active, id]);
    }

    const [data] = await pool.query(`SELECT * FROM user WHERE id = ?`, [id]);

    return res.status(200).json({
      status: true,
      message: "Update user success",
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await pool.query("DELETE FROM users WHERE id=?", [id]);

    return res.status(200).json({
      status: true,
      message: "DELETE IS SUCCESS",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }

  // const userIndex = USERS.findIndex((u) => u.id === id);

  // if (userIndex === -1) {
  //   return res.status(404).json({
  //     status: false,
  //     message: "User no found",
  //   });
  // }

  // const deletedUser = USERS.splice(userIndex, 1)[0];
  // return res.status(200).json({
  //   status: true,
  //   message: "Delete user success",
  // });
};
