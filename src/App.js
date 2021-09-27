import React, { useState, useEffect } from 'react'; //usestate for manage state ,useefect for fetch data
import axios from 'axios'; //for fetch data

import './App.css';
//styling divs with fetched user info from API
// const styles = {
//   display: 'inline',
//   width: '30%',
//   height: 95,
//   float: 'left',
//   padding: 3,
//   border: '0.5px solid black',
//   marginBottom: 7,
//   marginRight: 7,
// };

function App() {
  const [allData, setAllData] = useState([]); //holds info from api
  const [filteredData, setFilteredData] = useState(allData); //holds a copy after searchable word has value=>statechanges

  //search logica

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    // value.toLowerCase();
    let result = [];
    console.log('value', value);
    result = allData.filter((data) => {
      return (
        data.username.search(value) !== -1 || data.name.search(value) !== -1
      );
    });
    setFilteredData(result);
  };

  useEffect(() => {
    //side effect
    axios('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log('Error bad data: ', error);
      });
  }, []);

  return (
    <>
      <div style={{ margin: '0 auto', marginTop: '2%' }}>
        <label>Search: </label>
        <br />
        <input type='text' onChange={(event) => handleSearch(event)} />
      </div>
      <div style={{ padding: 10 }}>
        {filteredData.map((value, index) => {
          return (
            // style={styles}
            <div key={value.id}>
              <p>
                ID:
                {value.id} <br /> <u>Name</u>: {value.name}
              </p>
              <p>
                <u>Username :</u> {value.username}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
