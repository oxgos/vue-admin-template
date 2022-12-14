import { RES_ERROR } from "./../utils/request";
import { RES_OK } from "@/utils/request";
import type { MockjsRequestOptions } from "mockjs";

interface UserInfo {
  id: string;
  role: string;
  name: string;
  avatar: string;
  description: string;
}
type Tokens = Record<string, string>;
type Users = Record<string, UserInfo>;

const tokens: Tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
};

const users: Users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "Gavin",
    avatar: "https://s1.ax1x.com/2020/04/28/J5hUaT.jpg",
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "编辑员",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "可以看到除户管理页面之外的所有页面",
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "游客",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "仅能看到Dashboard、开发文档、权限测试和关于作者四个页面",
  },
};

export default {
  login: (config: MockjsRequestOptions) => {
    const { account } = JSON.parse(config.body);
    const token = tokens[account];
    if (!token) {
      return {
        code: RES_ERROR,
        message: "用户名或密码错误",
      };
    }
    return {
      code: RES_OK,
      token,
      userInfo: users[token],
    };
  },
  logout: (_: MockjsRequestOptions) => {
    return {
      code: RES_OK,
      data: "success",
    };
  },
  userInfo: (config: MockjsRequestOptions) => {
    const token = config.body;
    const userInfo = users[token];
    if (!userInfo) {
      return {
        status: RES_ERROR,
        message: "获取用户信息失败",
      };
    }
    return {
      status: RES_OK,
      userInfo,
    };
  },
  getUsers: () => {
    return {
      status: RES_OK,
      users: Object.values(users),
    };
  },
  deleteUser: (config: MockjsRequestOptions) => {
    const { id } = JSON.parse(config.body);
    const token = tokens[id];
    if (token) {
      delete tokens[id];
      delete users[token];
    }
    return {
      status: 0,
    };
  },
  editUser: (config: MockjsRequestOptions) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    const token = tokens[id];
    if (token) {
      users[token] = { ...users[token], ...data };
    }
    return {
      status: 0,
    };
  },
  ValidatUserID: (config: MockjsRequestOptions) => {
    const userID = config.body;
    const token = tokens[userID];
    if (token) {
      return {
        status: 1,
      };
    } else {
      return {
        status: 0,
      };
    }
  },
  addUser: (config: MockjsRequestOptions) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    tokens[id] = `${id}-token`;
    users[`${id}-token`] = {
      ...users["guest-token"],
      ...data,
    };
    return {
      status: 0,
    };
  },
};
