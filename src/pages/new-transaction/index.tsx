import { Input, Select, DatePicker, Button } from "antd";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/logout-button";
import { DEFAULT_TOAST_OPTIONS, ROUTE_KEYS } from "../../utils/constants";
import { toast } from "react-toastify";

interface NewTransactionType {
  amount: string;
  status: string;
  date: Dayjs | null | undefined;
}
const NewTransaction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NewTransactionType>({
    amount: "",
    status: "",
    date: null,
  });

  const createNewTransaction = async () => {
    try {
      const res = await fetch("https://mock-api.com/transactions", {
        method: "POST",
        body: JSON.stringify({
          amount: formData.amount,
          status: formData.status,
          date: formData.date?.format("YYYY-MM-DD"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      toast.success("Transactions Created Successfully", {
        ...DEFAULT_TOAST_OPTIONS,
      });
      navigate(ROUTE_KEYS.TRANSACTIONS);
    } catch (error) {
      console.error(error, "error");
      toast.error("Failed To Create Transaction", {
        ...DEFAULT_TOAST_OPTIONS,
      });
    } finally {
      setFormData({ amount: "", status: "", date: null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewTransaction();
  };

  const isSubmitDisabled =
    !formData.amount || !formData.status || !formData.date;
  return (
    <div className="max-w-[600px] mx-auto p-4">
      <Button
        onClick={() => navigate(-1)}
        className="!border-0 !bg-transparent mb-8 flex items-center gap-2"
      >
        <FaArrowCircleLeft size={16} />
        Back
      </Button>
      <h2 className="text-2xl font-medium mb-6 text-center">
        Create New Transaction
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="amount" className="text-xl mb-2">
              Transaction Amount
            </label>
            <Input
              value={formData.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="Amount"
              className="w-full"
              type="number"
              size="large"
              id="amount"
              min={0}
            />
          </div>
          <div>
            <label htmlFor="status" className="text-xl mb-2">
              Transaction Status
            </label>
            <Select
              className="w-full"
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, status: value }));
              }}
              value={formData.status}
              options={[
                { value: "pending", label: <span>Pending</span> },
                { value: "completed", label: <span>Completed</span> },
                { value: "failed", label: <span>Failed</span> },
              ]}
              size="large"
              placeholder="Select Status"
              allowClear
            />
          </div>
          <div>
            <label htmlFor="date" className="text-xl mb-2">
              Transaction Date
            </label>
            <DatePicker
              value={formData.date}
              onChange={(value) => setFormData({ ...formData, date: value })}
              format="YYYY-MM-DD"
              className="w-full"
              size="large"
              maxDate={dayjs()}
            />
          </div>

          <Button
            type="primary"
            size="large"
            className="w-full"
            htmlType="submit"
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </div>
      </form>
      <LogoutButton />
    </div>
  );
};

export default NewTransaction;
