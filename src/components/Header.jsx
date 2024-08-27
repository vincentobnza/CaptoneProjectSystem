const Header = (props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">{props.title}</h1>
        <p className="text-sm ">{props.description}</p>
      </div>
    </div>
  );
};

export default Header;
