import React, { useState } from "react";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/authHook";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();

  const handleSubmit = async () => {
    if (password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await register(username, password);

    if (response === null) {
      setError("Error registering user");
      return;
    }
  };

  return (
    <div className="flex flex-col p-8 rounded-lg shadow-custom-green w-full max-w-md">
      <div className="flex justify-start">
        <FontAwesomeIcon
          icon={faUserPlus}
          className="text-xl pl-8 mt-1 text-quickscript_light_gray"
        />
        <h2 className="text-xl font-bold text-quickscript_light_gray mb-6 pl-2 text-center">
          Register
        </h2>
      </div>
      <div className="mb-4">
        {error && (
          <div className="border border-red-500 bg-red-200 text-red-500 py-2 w-10/12 mb-3 mx-auto">
            {error}
          </div>
        )}
        <Input
          className="w-10/12 h-11 p-3 rounded-md mb-3 bg-quickscript_gray placeholder-quickscript_light_gray focus:outline-quickscript_light_gray focus:outline-none text-white"
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Input
          className="w-10/12 h-11 p-3 rounded-md mb-3 bg-quickscript_gray placeholder-quickscript_light_gray focus:outline-quickscript_light_gray focus:outline-none text-white"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Input
          className="w-10/12 h-11 p-3 rounded-md mb-3 bg-quickscript_gray placeholder-quickscript_light_gray focus:outline-quickscript_light_gray focus:outline-none text-white"
          placeholder="verify password"
          type="password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
      </div>
      <Button buttonType="primary" onClick={handleSubmit}>
        <FontAwesomeIcon
          icon={faUserPlus}
          className="text-xl mr-2 p-0 text-quickscript_white opacity-40"
        />
        <span className="text-quickscript_white opacity-40 group-hover:text-gray-300">
          Sign up
        </span>
      </Button>
      <div className="flex justify-end text-center mt-4 mr-4">
        <a
          href="/login"
          className="text-sm text-quickscript_light_gray hover:underline"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
