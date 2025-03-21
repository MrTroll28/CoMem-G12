import React from 'react';


const Info=()=>{
    return(
        <div className="w-[50%] mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Thông tin tài khoản</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Họ Tên *</label>
            <input 
              type="text" 
              value="Tran Viet Nhan" 
              readOnly 
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100" 
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Số điện thoại *</label>
            <input 
              type="text" 
              value="0818831546" 
              readOnly 
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100" 
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input 
              type="email" 
              value="nhantran.03042021@gmail.com" 
              readOnly 
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100" 
            />
          </div>
        </div>
      </div>
    )
}

export default Info;