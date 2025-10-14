"use client";
import { useState } from "react";
import { AuthAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, Card, Alert, Spin } from "antd";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  id: string;
  message?: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    setApiError(null);
    try {
      const res: LoginResponse = await AuthAPI.login({
        emailId: values.email.trim(),
        password: values.password,
      });

      if (res.token && res.id) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res.id);
        }
        router.push("/");
      }
    } catch (err: any) {
      if (err?.error) {
        setApiError(err.error); 
      } else {
        setApiError(err?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card
        style={{ maxWidth: 400, width: "100%", borderRadius: 12 }}
        styles={{ body: { padding: 40 } }}
        className="shadow-xl"
      >
        <Title level={2} className="text-center mb-6">
          Login
        </Title>

        <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter email"
              prefix={<UserOutlined />}
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              placeholder="Enter password"
              prefix={<LockOutlined />}
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          {apiError && (
            <div className="mb-4">
              <Alert type="error" message={apiError} showIcon />
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full flex justify-center items-center rounded-md"
              size="large"
              disabled={loading}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 20, color: "#fff" }} spin />}
                />
              ) : (
                "Login"
              )}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
