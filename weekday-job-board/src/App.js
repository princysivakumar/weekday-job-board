// import logo from './logo.svg';
// import './App.css';
// import FilterPanel from './components/search-filter';
// import JobCard from './components/cards';

// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//       <div>hii</div>

//       <div className="app">
//       <FilterPanel  />
//       {/* <div className="job-list">
//         {jobs.map(job => (
//           <JobCard key={job.id} job={job} />
//         ))}
//         {loading && <CircularProgress />}
//         {!loading && hasMoreJobs && (
//           <div className="load-more" onClick={handleLoadMore}>
//             Load More
//           </div>
//         )}
//       </div> */}
//       <JobCard/>
//     </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import FilterPanel from './components/search-filter';
import { TextField } from '@mui/material';
import JobCard from './components/cards';
import './App.css';




// interface Job {
//   jdUid: string;
//   jdLink: string;
//   jobDetailsFromCompany: string;s
//   maxJdSalary: number;
//   minJdSalary: number | null; // minJdSalary can be null
//   salaryCurrencyCode: string;
//   location: string;
//   minExp: number;
//   maxExp: number | null; // maxExp can be null
//   jobRole: string;
//   companyName: string;
//   logoUrl: string;
// }


const App= () => {
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    employmentType: '', // Remote/On-site
    techStack: '',
    role: '',
    minBasePay: ''
  }); // Stores filter values

  // Fetch jobs based on offset and filters (add filter logic when ready)
  const fetchJobs = async () => {
    setIsLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        limit: 10, 
        offset
       }) 
    }; 

    const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
    const data = await response.json() ;
    console.log(data);
    
    setJobs([...jobs, ...data.jdList]); 
    setOffset(offset + data.jdList.length); 
    setIsLoading(false); 
  };

  // Initial data fetching
  useEffect(() => {
   fetchJobs();
  }, []);


  

   // Handle filter changes
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value 
    });
  };

  // Infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight && 
      !isLoading 
    ) {
      fetchJobs(); 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]); 

  return (
    <div className="main">
      <div className='filters'>

      <FilterPanel />

      {/* Filter components - Add Material UI inputs for each filter criteria */}
     <div className="experiance-filter">
      <TextField label="Experience" name="minExperience" value={filters.minExperience} onChange={handleFilterChange} />
      {/* Add other filter components here */}
      </div>
      </div>
    

      <div className="jobs-list">
        {jobs.map((job) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
        {isLoading && <p>Loading more jobs...</p>}
      </div>
    </div>
  );
};

export default App;


