import { Card } from '@mui/material';
import React from 'react';
import './cards.css';
import Button from '@mui/material/Button';
import BoltIcon from '@mui/icons-material/Bolt';


// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Link from '@mui/material/Link';




const JobCard = ({ job }) => {
    const {
    jobDetailsFromCompany,
    maxJdSalary,
    minJdSalary,
    salaryCurrencyCode,
    location,
    minExp,
    maxExp,
    jobRole,
    companyName,
    logoUrl,
  } = job;
  return (
    <Card className="job-card">
      <div className="job-card-header">
        {logoUrl && <img
              src={logoUrl} 
              alt="logo"
              width={50} // Example: Adjust width/height as needed
              height={50}
              className="MuiBox-root css-bj12qo"
            /> }



        <div className="job-card-info">
          <div className='company-name'>{companyName}</div> 
          <div className='job-role'>{jobRole || 'All'}</div> 
          <div className='location'>{location}</div>
        </div>
      </div>
      <div className='estimate-salary'>Estimated Salary: <span>
          {minJdSalary && `${minJdSalary}-${maxJdSalary} ${salaryCurrencyCode}`} 
        </span></div>
      <div className="job-card-description">
        <div className='about-company'>About Company:</div>
        <p>{jobDetailsFromCompany}</p> {/* Truncate description */}
      </div>
      <div className='min-exp'>  Minimum Experience:</div>
        <div className='exp-value'>
          {minExp} - {maxExp || 'No Limit'} years 
        </div>
      <div className="job-card-footer">
      <Button className='easy-apply-button' variant="contained" startIcon={<BoltIcon />}>Easy Apply</Button>
        {/* Conditionally render "Easy Apply" button based on the image  */}
        {/* This section might need adjustment based on actual button presence*/}
        {/* {isEasyApplyButtonVisible && <button>Easy Apply</button>} */}
      </div>
    </Card>
  );
};

export default JobCard;
