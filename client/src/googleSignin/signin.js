import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

function SignIn() {
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        localStorage.setItem("email", result.user.email);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("email", user.email);
      } else {
        setUser(null);
        localStorage.removeItem("email");
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}!</p>
      ) : (
        <button onClick={handleSignIn}>Sign In With Google</button>
      )}
    </div>
  );
}

export default SignIn;
