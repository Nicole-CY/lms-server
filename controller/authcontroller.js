const bcrypt = require('bcryptjs');
const logger = require("../common/logsetting");
const { jwtConfig } = require("../appConfig");
const jwt = require("jsonwebtoken");
const userservice = require("../service/userservice");

const loginAsync = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let result = await userservice.getUserbyNameAsync(username);
  if (!result.isSuccess) {
    res.sendCommonValue(null, "login fail username or password not math", 0);
  } else {
    let isMatch = await bcrypt.compare(password, result.data.password);
    if (isMath) {
      let user = { id: result.data.id, username: result.data.username };
      let tokenStr = jwt.sign(user, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });
      res.sendCommonValue(
        { token: tokenStr, username: username },
        "login success",
        1
      );
    } else {
      res.sendCommonValue(null, "login fail username or password not math", 0);
    }
  }

  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       res.sendCommonValue(
  //         { id: 1, name: "login", dt: new Date() },
  //         "loginOutAsync",
  //         1
  //       );
  //       resolve(1);
  //     }, 2000);
  //   });
};

const loginOutAsync = async (req, res) => {
  // let epassword = req.query.password;
  // let result = await bcrypt.compare("123456", epassword);
  res.sendCommonValue("ddd", "loginOutAsync", 1);
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       res.sendCommonValue(
  //         { id: 1, name: "loginOut", dt: new Date() },
  //         "loginOutAsync",
  //         1
  //       );
  //       resolve(1);
  //     }, 2000);
  //   });
};

module.exports = {
  loginAsync,
  loginOutAsync,
};
