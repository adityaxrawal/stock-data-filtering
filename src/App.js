import React, { useState } from 'react';
import './App.css';

function App() {
  const stockData = require("./dataTable.json").slice(0, 1000)
  const [filteredStockData, setFilteredStockData] = useState(stockData)
  const filterHeadings = [
    {
      headingName: "Time Stamp",
      headingValue: "TIMESTAMP"
    },
    {
      headingName: "Symbol",
      headingValue: "SYMBOL"
    },
    {
      headingName: "Segment",
      headingValue: "SEGMENT"
    },
    {
      headingName: "Instrument Type",
      headingValue: "INSTRUMENT"
    },
    {
      headingName: "Option Type",
      headingValue: "OPTION_TYP"
    },
    {
      headingName: "OPEN",
      headingValue: "OPEN"
    },
    {
      headingName: "HIGH",
      headingValue: "HIGH",
    },
    {
      headingName: "LOW",
      headingValue: "LOW"
    },
    {
      headingName: "Expiry Date",
      headingValue: "EXPRIY_DT"
    },
    {
      headingName: "Strike Price",
      headingValue: "STRIKE_PR"
    },
    {
      headingName: "Change in Open Interest",
      headingValue: "CHG_IN_OI"
    },
    {
      headingName: "Contracts",
      headingValue: "CONTRACTS",
    },
    {
      headingName: "Settled Value",
      headingValue: "SETTLE_PR",
    },
    {
      headingName: "Total Value in Lakhs",
      headingValue: "VAL_INLAKH",
    },

  ]
  const handleFilterData = (e, index) => {
    const filterHeadingName = filterHeadings[index].headingValue
    const userInputValue = e.target.value
    const exactMatches = stockData.filter((data) => {
      return data[filterHeadingName] === userInputValue;
    });
    if (exactMatches.length > 0) {
      setFilteredStockData(exactMatches);
    } else {
      const partialMatches = stockData.filter((data) => {
        return data[filterHeadingName].includes(userInputValue);
      });
      setFilteredStockData(partialMatches);
    }
  }
  return (
    <div className="App">
      <div className="table">
        <div className="Filter">
          {filterHeadings.map((_, index) => (
            <span className="inputText" key={index}>
              <input type='text' placeholder={` Filter ${filterHeadings[index].headingName}`} onChange={(e) => handleFilterData(e, index)} />
            </span>
          ))}
        </div>
        <div className='TableHeader' style={{ borderBottom: filteredStockData.length === 0 ? "1px solid black" : "" }}>
          {filterHeadings.map((_, index) => (
            <span className="EachCell heading" key={index}>{filterHeadings[index].headingName}</span>
          ))}
        </div>
        {filteredStockData.length === 0 ?
          <span className="NoData">No Data Found</span>
          :
          filteredStockData.map((data, index) => {
            return (
              <div className='TableEachRow' key={index}>
                <div className="EachCell">{data.TIMESTAMP}</div>
                <div className='EachCell Symbol'>{data.SYMBOL}</div>
                <div className='EachCell'>NSEFO</div>
                <div className='EachCell'>{data.INSTRUMENT}</div>
                <div className='EachCell'>{data.OPTION_TYP}</div>
                <div className='EachCell OPEN'>{data.OPEN}</div>
                <div className='EachCell HIGH'>{data.HIGH}</div>
                <div className='EachCell LOW'>{data.LOW}</div>
                <div className='EachCell'>{data.EXPIRY_DT}</div>
                <div className='EachCell'>{data.STRIKE_PR}</div>
                <div className='EachCell' style={{ color: data.CHG_IN_OI > 0 ? "green" : data.CHG_IN_OI === 0 ? "black" : 'red' }}>{data.CHG_IN_OI}</div>
                <div className='EachCell'>{data.CONTRACTS}</div>
                <div className='EachCell'>{data.SETTLE_PR}</div>
                <div className='EachCell'>{data.VAL_INLAKH}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
