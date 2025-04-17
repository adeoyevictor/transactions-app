import { Button } from "antd";
import { logOut } from "../../utils/functions";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <Button
      className="!text-base !border-0 !bg-transparent !fixed bottom-6 right-6 z-2"
      onClick={logOut}
    >
      Logout
      <BiLogOut size={16} />
    </Button>
  );
};

export default LogoutButton;
