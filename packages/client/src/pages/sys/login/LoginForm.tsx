import { useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
} from 'antd';
import { useTranslation } from 'react-i18next';

import type { SignInReq } from '@/api/services/userService';
import { Respon } from '@/pages/components/contact/respon';
import { useSignIn } from '@/store/userStore';

import {
  LoginStateEnum,
  useLoginStateContext,
} from './providers/LoginStateProvider';

function LoginForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showRespon, setShowRespon] = useState(false);

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ username, password, agree }: SignInReq) => {
    if (!agree) {
      message.error('请同意免责申明');
      return;
    }

    setLoading(true);

    try {
      await signIn({ username, password, agree });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">
        {t('sys.login.signInFormTitle')}
      </div>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          agree: true,
          // username: "admin",
          // password: "demo1234",
        }}
        onFinish={handleFinish}
      >
        {/* <div className="mb-4 flex flex-col">
					<Alert
						description={
							<div className="flex flex-col">
								<div className="flex">
									<span className="flex-shrink-0 text-text-disabled">{t("sys.login.userName")}:</span>
									<span className="ml-1 text-text-secondary">
										admin / demo1234
									</span>
								</div>
								<div className="flex">
									<span className="flex-shrink-0 text-text-disabled">{t("sys.login.password")}:</span>
									<span className="ml-1 text-text-secondary">demo1234</span>
								</div>
							</div>
						}
						showIcon
					/>
				</div> */}

        <Form.Item
          name="username"
          rules={[
            { required: true, message: t('sys.login.accountPlaceholder') },
          ]}
        >
          <Input placeholder={t('sys.login.userName')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('sys.login.passwordPlaceholder') },
          ]}
        >
          <Input.Password
            type="password"
            placeholder={t('sys.login.password')}
          />
        </Form.Item>
        <Form.Item>
          <Row align="middle">
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('sys.login.rememberMe')}</Checkbox>
              </Form.Item>

              <Form.Item name="agree" valuePropName="checked" noStyle>
                <Checkbox>
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setShowRespon(true);
                    }}
                  >
                    我已同意免责申明
                  </a>
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              {/* <Button
								type="link"
								className="!underline"
								onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
								size="small"
							>
								{t("sys.login.forgetPassword")}
							</Button> */}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>

        {/* <Row align="middle" gutter={8}>
					<Col span={9} flex="1">
						<Button className="w-full !text-sm" onClick={() => setLoginState(LoginStateEnum.MOBILE)}>
							{t("sys.login.mobileSignInFormTitle")}
						</Button>
					</Col>
					<Col span={9} flex="1">
						<Button className="w-full !text-sm" onClick={() => setLoginState(LoginStateEnum.QR_CODE)}>
							{t("sys.login.qrSignInFormTitle")}
						</Button>
					</Col>
					<Col span={6} flex="1" onClick={() => setLoginState(LoginStateEnum.REGISTER)}>
						<Button className="w-full !text-sm">{t("sys.login.signUpFormTitle")}</Button>
					</Col>
				</Row>

				<Divider className="!text-xs">{t("sys.login.otherSignIn")}</Divider>

				<div className="flex cursor-pointer justify-around text-2xl">
					<AiFillGithub />
					<AiFillWechat />
					<AiFillGoogleCircle />
				</div> */}
      </Form>

      <Modal
        title=""
        width="80%"
        closable={{ 'aria-label': 'Custom Close Button' }}
        footer={null}
        open={showRespon}
        onOk={() => {
          setShowRespon(false);
        }}
        onCancel={() => {
          setShowRespon(false);
        }}
      >
        <div className="max-h-[700px] overflow-y-auto">
          <Respon />
        </div>
      </Modal>
    </>
  );
}

export default LoginForm;
