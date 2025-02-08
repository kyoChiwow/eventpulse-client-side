import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Register Here
  const createUserEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Register Here

  // Update User
  const updateUser = (userUpdateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, userUpdateData);
  };
  // Update User

  // Login Here
  const loginUserEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Login Here

  // Log Out here
  const userLogOut = () => {
    return signOut(auth);
  };
  // Log Out here

  //   Observer settings here
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axiosPublic.post("/jwt", user).then(() => {
          setLoading(false);
        });
      } else {
        axiosPublic.post("/logout", {}).then(() => {
          setLoading(false);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);
  //   Observer settings here

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUserEmail,
    updateUser,
    loginUserEmail,
    userLogOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
