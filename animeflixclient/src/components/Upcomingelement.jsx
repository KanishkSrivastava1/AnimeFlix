import React from 'react'

export default function Upcomingelement(props) {
  
  const dateTimeString = props.date
  const dateTime = new Date(dateTimeString);

  // Format the date and time components as needed
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month index
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const seconds = String(dateTime.getSeconds()).padStart(2, '0');
  
  // Construct the normal format string 
  const normalFormat = `${day}-${month}-${year}`;
  
  console.log(normalFormat); 

  return (
    


    <div className="max-w-sm bg-white  rounded-lg  dark:bg-gray-800 relative">
    <img className="w-full rounded-lg" src={props.image} alt={props.name} />
    
    <div className="absolute  top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 bg-gray-800 bg-opacity-70 hover:opacity-100 flex justify-center items-center">
        <div className=" ">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{props.name}</h3>
            <p className="mb-3 text-gray-700 dark:text-gray-200">{normalFormat}</p>
        </div>
    </div>
</div>



  )
}
