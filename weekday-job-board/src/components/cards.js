import { Card } from '@mui/material';
import React from 'react';
import './cards.css'


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
          <h2>{companyName}</h2> {/* Assuming company name is missing from UI */}
          <h3>{jobRole}</h3> {/* Assuming job title is missing from UI */}
          <p>{location}</p> {/* Assuming location is missing from UI */}
        </div>
      </div>
      <div className="job-card-description">
        <p>{jobDetailsFromCompany.slice(0, 150)}...</p> {/* Truncate description */}
      </div>
      <div className="job-card-footer">
        <span>
          {minJdSalary && `${minJdSalary}-${maxJdSalary} ${salaryCurrencyCode}`} {/* Assuming salary range is missing from UI */}
        </span>
        <span>
          {minExp} - {maxExp || 'No Limit'} years exp
        </span>
        {/* Conditionally render "Easy Apply" button based on the image  */}
        {/* This section might need adjustment based on actual button presence*/}
        {/* {isEasyApplyButtonVisible && <button>Easy Apply</button>} */}
      </div>
    </Card>
  );
};

export default JobCard;
