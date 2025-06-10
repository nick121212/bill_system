import { Divider, Typography } from 'antd';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import Character4 from '@/assets/images/characters/character_4.png';
import MotionContainer from '@/components/animate/motion-container';
import { varBounce } from '@/components/animate/variants/bounce';
import Contact from '@/pages/components/contact/contact';
import { themeVars } from '@/theme/theme.css';

export default function Page403() {
  return (
    <>
      <Helmet>
        <title>账号已过期</title>
      </Helmet>

      <MotionContainer className="flex flex-col items-center justify-center px-2">
        <m.div variants={varBounce().in}>
          <Typography.Title level={1} className="text-center">
            账号已过期
          </Typography.Title>
        </m.div>

        <Typography.Paragraph type="warning" className="text-center">
          你的账号已经过期，请联系我们进行付费开通。一个月内未续费的账号将被自动删除。
        </Typography.Paragraph>

        <Divider />

        <m.div variants={varBounce().in}>
          <Contact />
        </m.div>
      </MotionContainer>
    </>
  );
}
