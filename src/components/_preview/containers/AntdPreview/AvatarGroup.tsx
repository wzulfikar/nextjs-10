import { Space, Avatar, Divider, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';

AvatarGroup.title = 'AvatarGroup';
AvatarGroup.url = 'https://ant.design/components/avatar/';

const avatarImage = 'https://picsum.photos/seed/picsum/200/200';

export default function AvatarGroup() {
  return (
    <Space direction="vertical">
      <Avatar.Group>
        <Avatar src={avatarImage} />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
      <Divider />
      <Avatar.Group
        maxCount={2}
        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        <Avatar src={avatarImage} />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
      <Divider />
      <Avatar.Group
        maxCount={2}
        size="large"
        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        <Avatar src={avatarImage} />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
    </Space>
  );
}
