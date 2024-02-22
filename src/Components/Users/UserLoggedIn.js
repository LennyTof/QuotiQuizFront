import { useState, useEffect } from "react";

const IsConnect = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  })
  return isLoggedIn
};

export default IsConnect;
