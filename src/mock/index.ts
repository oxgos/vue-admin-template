import Mock from "mockjs";
import loginAPI from "./login";
import orderAPI from "./order";
// import tableAPI from "./table";

Mock.setup({
  timeout: "200-600",
});

// 登录与用户相关
Mock.mock(/\/login/, "post", loginAPI.login);
Mock.mock(/\/logout/, "post", loginAPI.logout);
Mock.mock(/\/userInfo/, "post", loginAPI.userInfo);
Mock.mock(/\/user\/list/, "get", loginAPI.getUsers);
Mock.mock(/\/user\/delete/, "post", loginAPI.deleteUser);
Mock.mock(/\/user\/edit/, "post", loginAPI.editUser);
Mock.mock(/\/user\/validatUserID/, "post", loginAPI.ValidatUserID);
Mock.mock(/\/user\/add/, "post", loginAPI.addUser);

// dashboard
Mock.mock(/\/transaction\/list/, "get", orderAPI.transactionList);

export default Mock;
