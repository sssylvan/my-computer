import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserApps } from "./services/actions";
import * as Status from "./services/status.js";

const UserApps = () => {
  const { status, data } = useSelector((state) => state.userApps);
  const dispatch = useDispatch();

  switch (status) {
    case Status.LOADING: {
      return (
        <div>
          {dispatch(fetchUserApps())}
          App 信息请求中...
        </div>
      );
    }
    case Status.SUCCESS: {
      return (
        <div>
          {data.map((app) => (
            <div key={app.id}>{app.name}</div>
          ))}
        </div>
      );
    }
    case Status.FAILURE: {
      return <div>App 信息装载失败</div>;
    }
    default: {
      throw new Error("unexpected status " + status);
    }
  }
};

export default UserApps;
