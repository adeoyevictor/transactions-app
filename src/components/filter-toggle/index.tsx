import { Button } from "antd";
import { FaFilter } from "react-icons/fa6";

type Props = {
  toggleFilter: () => void;
};

const FilterToggle = ({ toggleFilter }: Props) => {
  return (
    <div className="flex justify-end mb-4">
      <Button
        onClick={toggleFilter}
        className="text-base flex items-center gap-2"
      >
        Filter <FaFilter />
      </Button>
    </div>
  );
};

export default FilterToggle;
