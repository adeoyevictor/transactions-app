import { Table, Tag, Button } from "antd";
import type { TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { formatCurrency, isWithinRange } from "../../utils/functions";
import {
  DEFAULT_TOAST_OPTIONS,
  ROUTE_KEYS,
  STORAGE_KEYS,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { FilterType, TransactionType } from "../../utils/types";
import FilterToggle from "../../components/filter-toggle";
import Filters from "../../components/filters";
import LogoutButton from "../../components/logout-button";
import { toast } from "react-toastify";

const Transactions = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem(STORAGE_KEYS.USERNAME) ?? "User";
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>({
    status: "all",
    dateRange: {
      start: null,
      end: null,
    },
    amount: "",
    id: "",
  });

  const [tempAmount, setTempAmount] = useState<string>("");
  const [tempId, setTempId] = useState<string>("");

  const columns: TableProps<TransactionType>["columns"] = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, { amount }) => {
        return <span>{formatCurrency(amount)}</span>;
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          <Tag
            className="capitalize"
            color={
              status === "pending"
                ? "volcano"
                : status === "completed"
                ? "green"
                : status === "failed"
                ? "red"
                : ""
            }
          >
            {status}
          </Tag>
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const filteredData = useMemo(() => {
    return transactions.filter((item) => {
      const isStatusMatch =
        filter.status === "all" || item.status === filter.status;
      const isDateMatch =
        (!filter.dateRange.start ||
          dayjs(item.date).isAfter(filter.dateRange.start)) &&
        (!filter.dateRange.end ||
          dayjs(item.date).isBefore(filter.dateRange.end));

      const isAmountMatch =
        !filter.amount ||
        isWithinRange(Number(item.amount), 100, Number(filter.amount));

      const isIdMatch =
        !filter.id || item.id.toLowerCase().includes(filter.id.toLowerCase());
      return isStatusMatch && isDateMatch && isAmountMatch && isIdMatch;
    });
  }, [filter, transactions]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter((prev) => ({
        ...prev,
        id: tempId,
      }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [tempId]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter((prev) => ({
        ...prev,
        amount: tempAmount,
      }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [tempAmount]);

  const toggleFilter = () => setShowFilters((prev) => !prev);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("https://mock-api.com/transactions");
      const data: {
        message: string;
        status: number;
        data: TransactionType[];
      } = await res.json();
      setTransactions(data.data);
      toast.success("Transactions Fetched Successfully", {
        ...DEFAULT_TOAST_OPTIONS,
      });
    } catch (error) {
      console.error(error, "error");
      toast.error("Failed to Fetch Transactions", {
        ...DEFAULT_TOAST_OPTIONS,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <h1 className="text-3xl font-medium mb-5">
        Welcome {username}, here are your transactions
      </h1>
      <FilterToggle toggleFilter={toggleFilter} />
      {showFilters && (
        <Filters
          showFilters={showFilters}
          filter={filter}
          setFilter={setFilter}
          setTempAmount={setTempAmount}
          setTempId={setTempId}
          tempId={tempId}
          tempAmount={tempAmount}
        />
      )}
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-medium">Transactions</h2>
        <Button
          className="!text-base"
          onClick={() => navigate(ROUTE_KEYS.NEW_TRANSACTION)}
        >
          Add New
        </Button>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />

      <LogoutButton />
    </div>
  );
};

export default Transactions;
