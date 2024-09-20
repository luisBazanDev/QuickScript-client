import React, { useState } from "react";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/authHook";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async () => {
    const response = await login(username, password);

    if (!response) {
      console.log("Invalid username or password");
      setError("Invalid username or password");
      return;
    }
  };

  return (
    <div className="flex flex-col p-8 rounded-lg shadow-custom-green w-full max-w-md">
      <div className="flex justify-start">
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="text-2xl pl-8 mt-1 text-icon-color"
        />
        <h2 className="text-xl font-bold text-icon-color mb-6 pl-2 text-center">
          Login
        </h2>
      </div>
      <div className="mb-4">
        {error && (
          <div className="border border-red-500 bg-red-200 text-red-500 py-2 w-10/12 mb-3 mx-auto">
            {error}
          </div>
        )}
        <Input
          className="w-10/12 h-11 p-3 rounded-md mb-3 bg-input-color placeholder-icon-color focus:outline-icon-colory focus:outline-none text-white"
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          className="w-10/12 h-11 p-3 rounded-md mb-3 bg-input-color placeholder-icon-color focus:outline-icon-color focus:outline-none text-white"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button buttonType="primary" onClick={handleSubmit}>
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="text-2xl mr-2 p-0 text-text-color opacity-40 hover:text-text-color"
        />
        <span className="text-text-color opacity-40 hover:text-text-color">
          Sign in
        </span>
      </Button>
      <div className="flex justify-between mt-4">
        <a
          href="#"
          className="text-sm text-icon-color hover:underline"
        >
          Forgot your password?
        </a>
        <a
          href="/register"
          className="text-sm text-icon-color hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
