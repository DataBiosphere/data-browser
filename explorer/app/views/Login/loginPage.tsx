import React, { useContext } from "react";
import { AuthContext } from "../../common/context/authState";

export const LoginPage = (): JSX.Element => {
  const { authorizeUser } = useContext(AuthContext);

  return (
    <div>
      <button onClick={(): void => authorizeUser()}>Login with Google</button>
    </div>
  );
};
