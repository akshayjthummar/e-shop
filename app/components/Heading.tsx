type Props = {
  title: string;
  center?: boolean;
};
export const Heading = ({ title, center }: Props) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  );
};
