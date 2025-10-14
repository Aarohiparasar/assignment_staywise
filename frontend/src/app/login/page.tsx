"use client";
import { useState } from "react";
import { AuthAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, message, Card, Spin } from "antd";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

// Type for form values
interface LoginFormValues {
  email: string;
  password: string;
}

// Type for API response (message is optional)
interface LoginResponse {
  token: string;
  id: string;
  message?: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // AuthAPI.login already returns { token, id, message? }
      const res: LoginResponse = await AuthAPI.login({
        emailId: values.email.trim(), // send as username if backend expects it
        password: values.password,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.id);
      }

      // Display backend message if available
      message.success(res.message || "Login successful!");
      router.push("/");
    } catch (err: any) {
      message.error(err?.message || "Login failed");
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
              {
                type: "email",
                message: "Please enter a valid email address",
              },
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
