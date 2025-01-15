import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Space,
  Tag,
  Button,
  Descriptions,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  KeyOutlined,
  SettingOutlined,
} from "@ant-design/icons";

interface AdminProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
  dateJoined: string;
}

const initialProfile: AdminProfile = {
  id: "1",
  username: "admin123",
  fullName: "John Doe",
  email: "admin@example.com",
  role: "Super Admin",
  permissions: [
    "User Management",
    "Content Management",
    "System Settings",
    "Reports",
  ],
  lastLogin: "2025-01-14 09:00:00",
  dateJoined: "2024-01-01",
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>(initialProfile);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { Title, Text } = Typography;

  const handleEdit = (values: Partial<AdminProfile>) => {
    setProfile({ ...profile, ...values });
    setIsEditModalVisible(false);
    message.success("Profile updated successfully");
  };

  const showEditModal = () => {
    form.setFieldsValue(profile);
    setIsEditModalVisible(true);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <Title level={3} style={{ marginTop: 16 }}>
              {profile.fullName}
            </Title>
            <Tag color="blue">{profile.role}</Tag>
          </div>

          <Descriptions bordered>
            <Descriptions.Item label="Username" span={3}>
              {profile.username}
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={3}>
              {profile.email}
            </Descriptions.Item>
            <Descriptions.Item label="Last Login" span={3}>
              {profile.lastLogin}
            </Descriptions.Item>
            <Descriptions.Item label="Date Joined" span={3}>
              {profile.dateJoined}
            </Descriptions.Item>
            <Descriptions.Item label="Permissions" span={3}>
              <Space wrap>
                {profile.permissions.map((permission) => (
                  <Tag color="green" key={permission}>
                    {permission}
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>

          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={showEditModal}
            >
              Edit Profile
            </Button>
            <Button icon={<KeyOutlined />}>Change Password</Button>
            <Button icon={<SettingOutlined />}>Settings</Button>
          </Space>
        </Space>
      </Card>

      <Modal
        title="Edit Profile"
        open={isEditModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleEdit}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
