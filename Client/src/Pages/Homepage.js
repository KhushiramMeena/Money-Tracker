import React, { useState, useEffect } from "react";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../Component/Layout/Layout.js";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import axios from "axios";
import Loading from "../Component/Layout/Loading.js";
import Analytic from "../Component/Layout/Analytic.js";
import "./Homepage.css";
const { RangePicker } = DatePicker;
const moment = require("moment");

const Homepage = () => {
  const [showModel, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getData, setData] = useState([]);
  const [frequency, setFrequency] = useState("365");
  const [selectDate, setSelectDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShow(true);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //Submitbtn
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User ID:", user._id);
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transections/edit", {
          payload: {
            ...values,
            userId: user._id,
          },
          transectionId: editable._id,
        });
        setLoading(false);

        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        message.success("Transaction Edit successfully");
      } else {
        await axios.post("/api/v1/transections/add-data", {
          ...values,
          userid: user._id,
        });
        setLoading(false);

        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        message.success("Transaction Added successfully");
      }

      setShow(false);
      setEditable(null);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      message.error("Faild to add transection");
    }
  };
  //getall data

  //Useeffect hook
  useEffect(() => {
    const getAlltransec = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/api/v1/transections/getall", {
          userid: user._id,
          frequency,
          selectDate,
          type,
        });
        setLoading(false);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch issue with transection");
      }
    };
    getAlltransec();
  }, [frequency, selectDate, type]);

  //Delete item
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transections/delete", { transectionId: record._id });
      setLoading(false);
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      message.success("Transection  deleted successfully");
    
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Unable to delete");
    }
  };

  return (
    <Layout>
      {loading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      <div className="homepage">
        <div className="filters">
          <div className="frequency">
            <div>Select Frequency</div>

            <div>
              <Select
                value={frequency}
                onChange={(values) => setFrequency(values)}
              >
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 month</Select.Option>
                <Select.Option value="365">All</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
            </div>
            {frequency === "custom" && (
              <RangePicker
                value={selectDate}
                onChange={(values) => setSelectDate(values)}
              />
            )}
          </div>

          <div className="frequency">
            <div>Select Type</div>
            <div>
              <Select value={type} onChange={(values) => setType(values)}>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="charts">
          <div>
            <UnorderedListOutlined onClick={() => setViewData("table")} />
          </div>
          <div>
            <AreaChartOutlined onClick={() => setViewData("chart")} />
          </div>
          <div>
            <button className="addbtn" onClick={() => setShow(true)}>
              Add New{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="user_wrapper">
        <div className="userData">
          <div className="content-wrapper">
            <div className="content">
              {viewData === "table" ? (
                <Table columns={columns} dataSource={getData} />
              ) : (
                <Analytic getData={getData} />
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={editable ? "Edit Transection" : "Add New Transection"}
        open={showModel}
        onCancel={() => setShow(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="miscellaneous">Miscellaneous</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="grocery">Grocery</Select.Option>
              <Select.Option value="Maintenance">Maintenance</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <div>
            <button type="submit"> Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;
