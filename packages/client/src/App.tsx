import { ConfigProvider } from "antd";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Helmet } from "react-helmet-async";

import Logo from "@/assets/images/logo.png";
import Router from "@/router/index";

import { MotionLazy } from "./components/animate/motion-lazy";
import Toast from "./components/toast";
import userStore from "./store/userStore";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";

dayjs.locale('zh-cn');

function App() {
  const userInfo = userStore.getState();

  return (
    <ConfigProvider csp={{ nonce: "YourNonceCode" }} >
      <ThemeProvider adapters={[AntdAdapter]}>
        <MotionLazy>
          <Helmet>
            <title>{userInfo.userInfo?.company?.name}</title>
            <link rel="icon" href={Logo} />
          </Helmet>
          <Toast />
          <Router />
        </MotionLazy>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
