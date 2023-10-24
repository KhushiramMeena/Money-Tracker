import React from "react";
import { Progress } from "antd";
import "../analytic.css";

const Analytic = ({ getData }) => {
  //Categories wise Data
  const categories = [
    "salary",
    "food",
    "bills",
    "miscellaneous",
    "fees",
    "rent",
    "medical",
    "tax",
    "grocery",
    "Maintenance",
    "Entertainment"
  ];

  const totalTransec = getData.length;
  const totalIncometransec = getData.filter(
    (transection) => transection.type === "income"
  );
  const totalExpensetransec = getData.filter(
    (transection) => transection.type === "expense"
  );
  const totalIncomeper = (totalIncometransec.length / totalTransec) * 100;
  const totalExpenseper = (totalExpensetransec.length / totalTransec) * 100;

  //Total TurnOver Data
  const totalTurnOver = getData.reduce(
    (acc, transection) => acc + transection.amount,
    0
  );
  const totalIncomeTurnover = getData
    .filter((transection) => transection.type === "income")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalExpenseTurnover = getData
    .filter((transection) => transection.type === "expense")
    .reduce((acc, transection) => acc + transection.amount, 0);

  const totalIncomeTurnoverPer = (totalIncomeTurnover / totalTurnOver) * 100;
  const totalExpenseTurnoverPer = (totalExpenseTurnover / totalTurnOver) * 100;
  return (
    <div>
      {/* div _01 */}
      <h3 style={{textAlign:"center"}}>Graph Analytics</h3>
      <div className="wrapper">
      <div className="progress_01">
        <div className="progress_main">
          <span className="heading_graph">
            Total Transection={totalTransec}
          </span>
        </div>
        <div className="progress_cont">
          <span>Total Income :{totalIncometransec.length}</span>
          <span>Total Expense :{totalExpensetransec.length}</span>
        </div>
        <div className="progress_cont">
          <Progress
            type="dashboard"
            strokeColor={"green"}
            percent={totalIncomeper.toFixed(0)}
          />
          <Progress
            type="dashboard"
            strokeColor={"red"}
            percent={totalExpenseper.toFixed(0)}
          />
        </div>
      </div>

      {/* div_02 */}
   
        <div className="progress_01">
          <div className="progress_main">
            <span className="heading_graph">
              Total Turnover={totalTurnOver}
            </span>
          </div>
          <div className="progress_cont">
            <span> Income TurnOver :{totalIncomeTurnover}</span>
            <span> Expense TurnOver :{totalExpenseTurnover}</span>
          </div>
          <div className="progress_cont">
            <Progress
              type="dashboard"
              strokeColor={"green"}
              percent={totalIncomeTurnoverPer.toFixed(0)}
            />
            <Progress
              type="dashboard"
              strokeColor={"red"}
              percent={totalExpenseTurnoverPer.toFixed(0)}
            />
          </div>
        </div>
        </div>

        {/* div -03 */}
        
      <div className="category">
        <div className="category_data">
          <div className="progress_main">
          <h2 className="category_heading">Categories wise income</h2>
          </div>
          {categories.map((category) => {
            const amount = getData
              .filter(
                (transection) =>
                  transection.type === "income" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="main_category" >
                  <div className="target">
                    <h3>{category}</h3>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        </div>

 {/* Expense */}
         <div className="category">
        <div className="category_data">
          <div className="progress_main">
          <h2 className="category_heading">Categories wise Expense</h2>
          </div>
          {categories.map((category) => {
            const amount = getData
              .filter(
                (transection) =>
                  transection.type === "expense" &&
                  transection.category === category
              )
              .reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="main_category" >
                  <div className="target">
                    <h3>{category}</h3>
                    <Progress
                    strokeColor={"red"}
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        </div>
      
    </div>
  );
};

export default Analytic;
