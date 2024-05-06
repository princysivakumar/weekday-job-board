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
import { TextField } from '@mui/material';
import JobCard from './components/cards';
import './App.css';
import MenuItem from '@mui/material/MenuItem';


const roles = [
  {
    value: 'backend',
    label: 'Backend'
  },
  {
    value: 'frontend',
    label: 'Frontend'
  },
  {
    value: 'fullstack',
    label: 'FullStack'
  },
  {
    value: 'ios',
    label: 'IOS'
  },
  {
    value: 'android',
    label: 'Android'
  },
  {
    value: 'dev-ops',
    label: 'Dev-Ops'
  },
  
]

const experience =[
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: '6',
    label: '6'
  },
  {
    value: '7',
    label: '7'
  },
  {
    value: '8',
    label: '8'
  },
  {
    value: '9',
    label: '9'
  },
  {
    value: '10',
    label: '10'
  },
]

const location =[
  {
    value: 'remote',
    label: 'remote'
  },
  {
    value: 'hybrid',
    label: 'hybrid'
  },
  {
    value: 'In-Office',
    label: 'In-Office'
  },
]

const min_salary = [
  {
    value: '0L',
    label: '0L'
  },
  {
    value: '10L',
    label: '10L'
  },
  {
    value: '20L',
    label: '20L'
  },
  {
    value: '30L',
    label: '30L'
  },
  {
    value: '40L',
    label: '40L'
  },
  {
    value: '50L',
    label: '50L'
  },
  {
    value: '60L',
    label: '60L'
  },
  {
    value: '70L',
    label: '70L'
  },
]


const App= () => {
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    employmentType: '', // Remote/On-site
    noOfEmployees: '',
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
    
    setJobs([...jobs, ...data.jdList]); 
    setOffset(offset + data.jdList.length); 
    setIsLoading(false); 
    setFilteredJobs([...jobs, ...data.jdList])
  };

  // Initial data fetching
  useEffect(() => {
   fetchJobs();
  }, []);


  

   // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value 
    }));
    filterJobs(name, value);
  };

  const filterJobs = (filterName, filterValue) => {
    const filtered = jobs.filter(job => {
      if (filterName === 'minExperience') {
        return job.minExp >= parseInt(filterValue);
      }
      if (filterName === 'minBasePay') {
        return job.minJdSalary >= parseInt(filterValue);
      }
      if (filterName === 'location') {
        return job.location === filterValue;
      }
     
      if(filterName === 'companyName'){
        return job.companyName === filterValue;
      }
      if(filterName === 'role'){
        return job.jobRole === filterValue;
      }
      return true; // If no match found, include the job
    });
    setFilteredJobs(filtered);
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

<div  >
<TextField
          
          select
          label='Roles'
          className='filter-width'
          name='role'
          value={filters.role}
          onChange={handleFilterChange}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
</div>

{/* no of employes data is not coming in the api */}

<div >
<TextField
          
          select
          label='Experience'
          className='filter-width'
          name='minExperience'
          value={filters.minExperience}
          onChange={handleFilterChange}
        

        >
          {experience.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
</div>

<div >
<TextField
         
          select
          label='location'
          defaultValue= 'remote'
          className='filter-width'
          name='location'
          value={filters.location}
          onChange={handleFilterChange}

        >
          {location.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
</div>

<div >
<TextField
          
          select
          label='Minimum Base Pay Salary'
          className='filter-width'
          name='minBasePay'
          value={filters.minBasePay}
          onChange={handleFilterChange}
        >
          {min_salary.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
</div>

<div >
<TextField
          label='Company Name'
          className='filter-width'
          name='companyName'
          value={filters.companyName}
          onChange={handleFilterChange}
        >
        </TextField>
</div>



</div>

      <div className="jobs-list">
        {filteredJobs.map(job => (
          <JobCard key={job.jdUid} job={job} /> 
        ))}
         {isLoading && <p>Loading more jobs...</p>}
      </div>
    </div>
  );
};

export default App;


