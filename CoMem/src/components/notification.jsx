import { createContext, useContext, useReducer } from "react";


const NotificationContext = createContext();


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, action.payload]; 
    case "REMOVE_NOTIFICATION":
      return state.filter((notification) => notification.id !== action.payload);
    default:
      return state;
  }
};


export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { id, message, type }
    });

    setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
    }, 5000);
  };

  const removeNotification = (id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
      <NotificationDisplay notifications={notifications} removeNotification={removeNotification} />
    </NotificationContext.Provider>
  );
};


export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};


const NotificationDisplay = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          className={`relative p-3 rounded-lg text-white shadow-md flex items-center justify-between w-80 ${
            type === "success" ? "bg-green-500" :
            type === "warning" ? "bg-yellow-500" :
            "bg-red-500"
          }`}
        >
          <span>{message}</span>
          <button
            className="ml-4 text-white font-bold hover:text-gray-300"
            onClick={() => removeNotification(id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
