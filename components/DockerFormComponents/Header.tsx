import { ModeToggle } from "../DarkModeToggle";

const Header = () => {
  return (
    <div className="relative z-20 py-4 px-10 flex items-center justify-between border-b-2  border-b-docker-blue">
      <h1 className="text-2xl font-extrabold text-docker-blue">
        {" "}
        Docker-Composer{" "}
      </h1>
      <ModeToggle />
    </div>
  );
};

export default Header;
