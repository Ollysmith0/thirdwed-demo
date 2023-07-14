import React from "react";

interface DashboardProps {
  address: string;
}

const Dashboard = ({ address }: DashboardProps) => {
  return <div>{address}</div>;
};

export default Dashboard;
