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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const roles = [
  {
    value: 'Backend',
    label: 'Backend'
  },
  {
    value: 'Frontend',
    label: 'Frontend'
  },
  {
    value: 'FullStack',
    label: 'FullStack'
  },
  {
    value: 'IOS',
    label: 'IOS'
  },
  {
    value: 'Flutter',
    label: 'Flutter'
  },
  {
    value: 'Dev-Ops',
    label: 'Dev-Ops'
  },
  
]

const no_of_employes = [
  {
    value: '1-10',
    label: '1-10'
  },
  {
    value: '11-20',
    label: '11-20'
  },
  {
    value: '21-50',
    label: '21-50'
  },
  {
    value: '51-100',
    label: '51-100'
  },
  {
    value: '101-200',
    label: '101-200'
  },
  {
    value: '201-500',
    label: '201-500'
  },
  {
    value: '500+',
    label: '500+'
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
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: 'remote',
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
        return job.experience >= parseInt(filterValue);
      }
      if (filterName === 'minBasePay') {
        return job.basePay >= parseInt(filterValue);
      }
      if (filterName === 'location') {
        return job.location === filterValue;
      }
     
      if(filterName === 'noOfEmployees'){
        return job.noOfEmployees === filterValue;
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

<div >
<TextField
          
          select
          label='Number of Employees'
          className='filter-width'
          name='noOfEmployees'
          value={filters.noOfEmployees}
          onChange={handleFilterChange}
        >
          {no_of_employes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
</div>

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


