import jwtDecode from 'jwt-decode';

useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded user data:", decoded);
  
        // Example: you could store this in state or redirect
        // setUser(decoded); // if using state
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);
  