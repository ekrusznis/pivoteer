import { CircleHelp } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="bg-deepIndigo flex justify-between items-center px-5 h-[80px]">
      <div className="flex items-center gap-3">
        <div className="w-[40px] h-[40px] rounded-full bg-neonPink"></div>
        <p className="text-2xl">My Pivoteer</p>
      </div>
      <div className="flex items-center gap-5">
        <Link to="/help-center">
          <Button>
            <CircleHelp className="mr-2" />
            Help
          </Button>
        </Link>
        <Button>Log in</Button>
      </div>
    </div>
  );
};

export default Navigation;
