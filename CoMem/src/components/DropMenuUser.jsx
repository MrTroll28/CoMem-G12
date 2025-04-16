import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, message, Space } from 'antd';
import { FaUser } from 'react-icons/fa6';
import { DownOutlined } from '@ant-design/icons';

const DropMenuUser = () => {
  const navigate = useNavigate();
 
  const handleMenuClick = ({ key }) => {
    if (key === '1') {
      
      navigate('/infouser');
    } else if(key==='3'){
      navigate('/feedback')
    } 
    else if(key==='2'){
      navigate('/orders')
    } 

    else {
      message.info(`Click on item ${key}`);
    }
  };

  const items = [
    {
      label: 'Thông tin cá nhân',
      key: '1',
    },
    {
      label: 'Danh sách đơn hàng',
      key: '2',
      link: '/oderlist',
    },
    {
      label: 'Gửi ý kiến',
      key: '3',
      link: '/feedback',
    },
    
  ];

  return (
    <Dropdown
      className='text-emerald-400'
      menu={{
        items,
        onClick: handleMenuClick,
      }}
    >
      <span onClick={(e) => e.preventDefault()}>
        <Space className="text-white text-[28px]">
          <FaUser className="text-white text-[28px]" />
          <DownOutlined className="text-white text-[28px]" />
        </Space>
      </span>
    </Dropdown>
  );
};

export default DropMenuUser;