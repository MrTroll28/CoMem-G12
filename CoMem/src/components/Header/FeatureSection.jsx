import React from 'react';

const features = [
  { id: 1, title: "Miễn phí giao hàng", description: "Áp dụng cho đơn hàng từ 500.000đ", icon: "🚚" },
  { id: 2, title: "Đổi trả dễ dàng", description: "Hỗ trợ đổi trả trong 7 ngày", icon: "🔄" },
  { id: 3, title: "Thanh toán an toàn", description: "Hỗ trợ nhiều phương thức thanh toán", icon: "💳" },
];

const FeatureSection = () => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {features.map((feature) => (
        <div key={feature.id} className="p-6 border rounded-lg shadow-lg">
          <div className="text-4xl">{feature.icon}</div>
          <h3 className="text-xl font-bold mt-2">{feature.title}</h3>
          <p className="text-gray-600 mt-1">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
