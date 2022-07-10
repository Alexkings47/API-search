import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Dashboard = () => {
  const [apiData, setApiData] = useState();
  const [searchValue, setSearchValue] = useState();
  function search() {
    fetch(`http://localhost:5000/api?api=${searchValue}`)
      .then((resp) => resp.json())
      .then((data) => setApiData(data.users));
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <StyledDiv>
      <div id="search" className="search-div">
        <input
          placeholder={"api name"}
          value={searchValue}
          name={"api"}
          onChange={handleChange}
        />
        <button className="search" onClick={search}>
          search API
        </button>
      </div>
      <div className="details">
        <h2 className="description">
          Search with the name of API in the search bar above.
        </h2>
        <a className="small-link" href="https://api.publicapis.org/entries">
          get Api name from:
          <span className="answer-link">https://api.publicapis.org/entries</span>
        </a>
        <p className="about">
          Description: <span className="answer"> {apiData?.Description ===undefined? "not found": apiData?.Description}</span>
        </p>
        <p className="category">
          Category: <span className="answer"> {apiData?.Category ===undefined? "not found": apiData?.Category}</span>
        </p>
        <a className="link" href={apiData?.Link === undefined? "": apiData?.Link}>
          Link:<span className="answer-link"> {apiData?.Link ===undefined? "not found": apiData?.Link} </span>
        </a>
      </div>
    </StyledDiv>
  );
};

export default Dashboard;
const StyledDiv = styled.div`
  background: linear-gradient(#040137, #6c026b);
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  color: white;
  font-size: 18px;

  .description {
    text-align: center;
    text-transform: capitalize;
    padding-bottom: 3rem;
  }
  .details {
    font-weight: 500;
    margin-top: 3rem;

    * {
      display: flex;
      justify-content: space-between;
    }
  }
  

  .answer,
  .answer-link {
    width: 70%;
    font-size: 16px;
  }
  .answer-link {
    cursor: pointer;
    color: #2e90e5;
  }
  .link,
  .small-link,
  .small-link:visited,
  .link-visited {
    text-decoration: none;
    color: white;
  }

  .search-div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 23rem;
    height: 2.5rem;
    overflow: hidden;

    input {
      height: 2.5rem;
      width: 76%;
      text-indent: 1rem;
      border: 1px solid #ebf3f7;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      font-size: 14px;
      font-weight: 500;

      ::placeholder {
        color: grey;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .search {
      border: none;
      background-color: #2e90e5;
      height: 2.5rem;
      width: 24%;
      color: white;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      font-size: 14px;
      font-weight: 600;
    }
  }
`;
