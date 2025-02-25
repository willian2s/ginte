import Image from "next/image";
import LogoImg from "../../assets/images/Logo.svg";

interface LogoProps {
  className: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Image
      src={LogoImg}
      alt="Logo"
      width={50}
      height={50}
      className={className}
    />
  );
};
