import { FC } from "react";
import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

const Status: FC<StatusProps> = ({ bg, color, icon: Icon, text }) => {
  return (
    <div>
      <div
        className={`${color} 
      px-1 rounded flex items-center gap-1`}
      >
        {text}
        <Icon size={15} />
      </div>
    </div>
  );
};

export default Status;
