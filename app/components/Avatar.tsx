import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  src?: string | null | undefined;
};
export const Avatar = ({ src }: Props) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={30}
        width={30}
      />
    );
  }
  return <FaUserCircle size={24} />;
};
