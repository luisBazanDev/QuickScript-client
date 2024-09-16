import React, { useState } from "react";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Logging in:", { username, password });
  };

  return (
    <div className="flex flex-col p-8 rounded-lg shadow-custom-green w-full max-w-md">
      <div className="flex justify-start">
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="text-2xl pl-8 mt-1 text-quickscript_light_gray"
        />
        <h2 className="text-xl font-bold text-quickscript_light_gray mb-6 pl-2 text-center">
          Login
        </h2>
      </div>
      <div className="mb-4">
        <Input
          className="w-10/12 h-11 p-3 rounded-md mb-3 bg-quickscript_gray placeholder-quickscript_light_gray focus:outline-quickscript_light_gray focus:outline-none text-white"
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          className="w-10/12 h-11 p-3 rounded-md mb-3 bg-quickscript_gray placeholder-quickscript_light_gray focus:outline-quickscript_light_gray focus:outline-none text-white"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        buttonType="primary"
        onClick={handleSubmit}
        >
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="text-2xl mr-2 p-0 text-quickscript_white opacity-40 hover:text-quickscript_white"
        />
        <span className="text-quickscript_white opacity-40 hover:text-quickscript_white">
          Sign in
        </span>
      </Button>
      <div className="flex justify-between mt-4">
        <a href="#" className="text-sm text-quickscript_light_gray hover:underline">
          Forgot your password?
        </a>
        <a href="/register" className="text-sm text-quickscript_light_gray hover:underline">
          Register
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
