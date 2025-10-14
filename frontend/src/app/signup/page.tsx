"use client";
import { useState } from "react";
import { AuthAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, Card, Alert } from "antd";

const { Title } = Typography;

interface SignupFormValues {
  userName: string;
  emailId: string;
  mobileNumber: string;
  password: string;
}

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null); 
  const router = useRouter();

  const onFinish = async (values: SignupFormValues) => {
    setLoading(true);
    setApiError(null); 
    try {
      const res: any = await AuthAPI.signup(values);
      if (res.status === "error") {
        setApiError(res.error || "Signup failed"); 
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      setApiError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card style={{ maxWidth: 450, width: "100%", borderRadius: 12 }} className="shadow-xl">
        <Title level={2} className="text-center mb-6">
          Sign Up
        </Title>

        <Form<SignupFormValues> layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter username" size="large" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="emailId"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" size="large" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { required: true, message: "Please enter your mobile number" },
              { pattern: /^[0-9]{10}$/, message: "Mobile number must be 10 digits" },
            ]}
          >
            <Input placeholder="Enter mobile number" size="large" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" size="large" className="rounded-md" />
          </Form.Item>

          {apiError && <Alert type="error" message={apiError} className="mb-4" showIcon />}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md"
              size="large"
              loading={loading}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
