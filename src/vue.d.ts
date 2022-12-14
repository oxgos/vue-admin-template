import axios from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: typeof axios;
  }
}

export {};
