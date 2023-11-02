import { useState } from "react";
import { sha256 } from "js-sha256";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Assuming you have the stored password data
    const storedPasswordData = {
      username: "sovanroth",
      email: "eobard00@gmail.com",
      role: "1",
      authentication: {
        password:
          "31d847d85206b0d42f55512cac66bdba9cdd62adaee380d870a371549b2de0e2",
        salt: "MttWYkh0m/u5PSt+50vuuXggyO9Xk30Db6URkCh+qCrFb7QmRC/9sMgvhvpgH7G27u6rtXGoMPNu0SkMT0cMBoX6Yq8WdRGKkVQ7YNI3FC8HrGuuMCa1H9HwzuoBgAv/SNqfjrSuaWJWJsk1t6h/aLfNAarM0sD1kru4gooTECM=",
      },
      _id: "654215b084848670df0140a7",
      __v: 0,
    };

    // Hash the input password using the provided salt
    const hashedInputPassword = sha256(
      password + storedPasswordData.authentication.salt
    );

    // Compare the hashed input password with the stored hashed password
    if (hashedInputPassword === storedPasswordData.authentication.password) {
      // Passwords match, login successful
      setLoginError(false);
      // Perform further actions (e.g., redirect to a dashboard)
    } else {
      // Passwords don't match, login failed
      setLoginError(true);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Password:
        <input type="password" value={password} onChange={handleInputChange} />
      </label>
      <button type="submit">Login</button>
      {loginError && <p>Incorrect password. Please try again.</p>}
    </form>
  );
};
