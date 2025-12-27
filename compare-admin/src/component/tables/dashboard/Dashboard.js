import React, { useState } from 'react';
import Icon1 from '../../../assets/icons/user.png'
import Icon2 from '../../../assets/icons/order.png'
import Icon3 from '../../../assets/icons/earn.png'
import Icon4 from '../../../assets/icons/product.png'
import ReactApexChart from 'react-apexcharts';
import $ from "jquery"

const Dashboard = () => {
  return (
    <div className="mainDashboard">
      <div className="dashBoardHead">
        <h3 className='m3-bottom'>Welcome Admin!</h3>
        <p>Dashboard</p>
      </div>
      <div className="mainDashbox">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox title={`Total Users`} rate={`+16.26`} count={`45,954`} img={Icon1} name={`User`} />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox title={`Total Order`} rate={`+18.26`} count={`18,540`} img={Icon2} name={`Order`} />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox title={`Total Earn`} rate={`+28.26`} count={`1740`} img={Icon3} name={`Earn`} />
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <DashBox title={`Total Product`} rate={`+28.26`} count={`12,740`} img={Icon4} name={`Product`} />
          </div>
        </div>
      </div>
      <div className="mainChart m40-top">
        <div className="row">
          <div className="col-12">
            <ApexChart />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;


const DashBox = ({ title, rate, count, img, name }) => {
  return (
    <div className="dashBox">
      <div className="boxHead betBox">
        <p>{title ? title : "-"}</p>
        <p className='text-success'>{rate ? rate : 0}</p>
      </div>
      <div className="boxBody">
        <h2 className='m0'>{count ? count : 0}</h2>
      </div>
      <div className="boxFooter">
        <div className="boxLink">
          <a href="#">View All {name ? name : '-'}</a>
        </div>
        <div className="boxIcon">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  )
}

const ApexChart = () => {
  var webSize = $(window).width();
  const resHeight = (webSize >= 992) ? 500 : (webSize < 992 && webSize > 576) ? 400 : 300

  const [chartData, setChartData] = useState({
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 200],
      color: "#394149",
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41],
      color: "#A86464",
    }],
    options: {
      chart: {
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={resHeight} />
    </div>
  );
}
