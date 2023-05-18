import React, { useState, useEffect } from "react";
import Header from "./SimpleHeader";
import Footer from "./Footer";

const EditAdmin = () => {

  const adminId = localStorage.getItem('adminid');

  const [name, setName] = useState("");
  const [cnic, setCNIC] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const tempName = localStorage.getItem('Aname');
  const tempEmail = localStorage.getItem('Aemail');
  const tempCnic = localStorage.getItem('Acnic');
  const tempContact = localStorage.getItem('Acontact');
  const tempAddress = localStorage.getItem('Aaddress');

  useEffect(() => {
     setName(tempName);
     setCNIC(tempCnic);
     setContact(tempContact);
     setEmail(tempEmail);
     setAddress(tempAddress);
  }, []);

  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');
  const [show, setshow] = useState(false);

  
  function check()
  {
    fetch('http://localhost:5000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "Select adminId, name, email, cnic, contact, address, password from admin where adminId ="+adminId
      })
    })
    .then(res => res.text()) // Get the response as a string
    .then(data => {
        const dataArray = data.split(',');
       if(dataArray[0] == adminId && dataArray[1] == name && dataArray[2] == email && dataArray[3] == cnic && dataArray[4] == contact && dataArray[5] == address && dataArray[6] == password)
       {
        localStorage.setItem('adminid', dataArray[0]);
        localStorage.setItem('Aname', dataArray[1]);
        localStorage.setItem('Aemail', dataArray[2]);
        localStorage.setItem('Acnic', dataArray[3]);
        localStorage.setItem('Acontact', dataArray[4]);
        localStorage.setItem('Aaddress', dataArray[5]);
       window.location.href = "/admin-console";
    
       }
       else{
        console.log("hello");
        //not update
       }
       
 
    })
    .catch(err => console.error(err));
  }

  const handleSubmit = (e) => {
    //console.log("DECLARE ecount NUMBER := 0; ccount NUMBER := 0; buyerid NUMBER := 0; name VARCHAR2(50); email VARCHAR2(50); cnic VARCHAR2(50); contact VARCHAR2(50); address VARCHAR2(50); BEGIN Select count() INTO ecount from buyer where email='"+email+"' AND BuyerID <> "+CustomerId+"; Select count() INTO ccount from buyer where cnic='"+cnic+"' AND BuyerID <> "+CustomerId+"; if(ecount = 0 AND ccount = 0) then Update buyer set name ='"+name+"', cnic='"+cnic+"', contact='"+contact+"', address='"+address+"', email='"+email+"', password='"+password+"' where BuyerID = "+CustomerId+";Select buyerid, name, email, cnic, contact, address into buyerid, name, email, cnic, contact, address from buyer where buyerID ="+CustomerId+";DBMS_OUTPUT.PUT_LINE(buyerid||', '||name||', '||email||', '||cnic||', '||contact||', '||address);end if; END;");
    e.preventDefault();
    fetch('http://localhost:5000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: "DECLARE ecount NUMBER := 0; ccount NUMBER := 0; BEGIN Select count(*) INTO ecount from admin where email='"+email+"' AND adminId <> "+adminId+"; Select count(*) INTO ccount from admin where cnic='"+cnic+"' AND adminId <> "+adminId+"; if(ecount = 0 AND ccount = 0) then Update admin set name ='"+name+"', cnic='"+cnic+"', contact='"+contact+"', address='"+address+"', email='"+email+"', password='"+password+"' where adminId = "+adminId+"; end if; END;"
      })
    })
    .then(res => res.text()) // Get the response as a string
    .then(data => {
 
  
        check();
      
      if(data.includes(email)) {
        // The tuple was inserted successfully
        
        const dataArray = data.split(',');
        localStorage.setItem('vendor', dataArray[0]);
        localStorage.setItem('name', dataArray[1]);
        localStorage.setItem('gmail', dataArray[2]);
        localStorage.setItem('cnic', dataArray[4]);
        localStorage.setItem('contact', dataArray[5]);
        localStorage.setItem('address', dataArray[6]);
        window.location.href = "/customer-profile";
      } else {
        // The tuple was not inserted
        console.log("Tuple was not inserted");
      }
    })
    .catch(err => console.error(err));
  };
  
  


  return (
    <div><Header />
   

    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
              Admin ID
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={adminId}
              onChange={(e) => setName(e.target.value)}
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              pattern="[^',;]*"
              title="Invalid input. Please avoid single quotation, comma, and semi-colon characters."
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
              CNIC
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="cnic"
              value={cnic}
              onChange={(e) => setCNIC(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="contact">
              Contact
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contact"
              type="tel"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              pattern="[^',;]*"
              title="Invalid input. Please avoid single quotation, comma, and semi-colon characters."
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="[^',;]*"
              title="Invalid input. Please avoid single quotation, comma, and semi-colon characters."
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="password">
              New Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              pattern="[^',;]*"
              title="Invalid input. Please avoid single quotation, comma, and semi-colon characters."
            />
          </div>
          
       
        <div className="flex justify-between items-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
          {/* <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/signin"
          >
            Already have an account? Sign in
          </Link> */}
        </div>
      </form>
      </div>
  </div>
    </div>
  </div>
  <Footer />
  </div>
);
};

export default EditAdmin;