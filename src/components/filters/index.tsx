import { Input, Select, DatePicker } from "antd";
import { FilterType } from "../../utils/types";

const { RangePicker } = DatePicker;

type Props = {
  showFilters: boolean;
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  tempAmount: string;
  setTempAmount: (value: string) => void;
  tempId: string;
  setTempId: (value: string) => void;
};
const Filters = ({
  showFilters,
  tempId,
  setTempId,
  tempAmount,
  setTempAmount,
  filter,
  setFilter
}: Props) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-4 my-4 transition-all duration-500 ease-in-out transform ${
        showFilters
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <Input
        value={tempId}
        onChange={(e) => setTempId(e.target.value)}
        name="id"
        placeholder="ID"
        className="w-full max-w-[120px]"
      />
      <Input
        value={tempAmount}
        onChange={(e) => setTempAmount(e.target.value)}
        name="amount"
        placeholder="Amount"
        type="number"
        className="w-full max-w-[120px]"
        min={0}
      />
      <Select
        className="w-full max-w-[120px]"
        onChange={(value) => {
          setFilter({ ...filter, status: value });
        }}
        value={filter.status}
        options={[
          { value: "all", label: <span>All</span> },
          { value: "pending", label: <span>Pending</span> },
          { value: "completed", label: <span>Completed</span> },
          { value: "failed", label: <span>Failed</span> },
        ]}
      />
      <RangePicker
        className="w-full max-w-[200px]"
        value={
          filter.dateRange.start && filter.dateRange.end
            ? [filter.dateRange.start, filter.dateRange.end]
            : null
        }
        onChange={(dates) => {
          setFilter({
            ...filter,
            dateRange: {
              start: dates?.[0] ?? null,
              end: dates?.[1] ?? null,
            },
          });
        }}
        format="YYYY-MM-DD"
      />
    </div>
  );
};

export default Filters;
