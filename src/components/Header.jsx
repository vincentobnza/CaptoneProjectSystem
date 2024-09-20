import { Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { LiaCertificateSolid } from "react-icons/lia";

const Header = (props) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="w-full flex justify-between items-center">
        <div className="space-y-2">
          <h4 className="text-3xl font-semibold font-Merriweather">
            {props.title}
          </h4>
          <p className="text-sm font-semibold">{props.description}</p>
        </div>

        <div className="flex">
          <Link
            to="/certificates"
            className="flex items-center gap-2 text-xs font-semibold p-3 rounded-full border border-zinc-400"
          >
            My Certificates
            <LiaCertificateSolid size={18} />
          </Link>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm font-medium">
        <Link to="/student-dashboard">Learn</Link>
        <Divider orientation="vertical" />
        <Link to="/student-dashboard/learnings">My Learnings</Link>
        <Divider orientation="vertical" />
        <Link to="/student-dashboard/school-modules">School Modules</Link>
        <Divider orientation="vertical" />
        <Link to="/play-game">Play Game</Link>
      </div>
    </div>
  );
};

export default Header;
