
import React, { createContext, useState, useEffect } from "react";



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Danh sách user
  const [currentUser, setCurrentUser] = useState(null); // User đang đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
      return localStorage.getItem("isLoggedIn") === "true";
    });
  
    const handleLogin = (user) => {
      setIsLoggedIn(true);
      setCurrentUser(user);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
    };
  
    const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
    };
    
    useEffect(() => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Lỗi khi parse JSON:", error);
          localStorage.removeItem("currentUser"); // Xóa dữ liệu lỗi
        }
      }
    }, []);
    
  
  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data.user); // Lưu user vào context
        fetchUsers(); // Gọi API lấy danh sách user ngay sau khi đăng nhập
        handleLogin();
      } else {
        console.error("Lỗi đăng nhập:", data.message);
      }
    } catch (error) {
      console.error("Lỗi kết nối đến server:", error);
    }
  };

  // Hàm lấy danh sách user
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data?.users && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error("API trả về dữ liệu không hợp lệ:", data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách users:", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, currentUser, login, fetchUsers,handleLogout,handleLogin,isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
