//import react
import React from 'react';
//import params
import { useParams } from 'react-router-dom';

//create a contact details component
const Details = () => {

    const params = useParams();
    //create an async fetch request
   const fetchContact = async () => {
       //fetch a contact based on the path parameter id
         const contact = await fetch(`http://localhost:3500/cms/${params.id.toString()}`);

       //check if response not ok
       if (!contact.ok) {
           const message = `An error has occured: ${contact.status}`;
           throw new Error(message);
       }
       const data = await contact.json();
       //populate the data to the fields
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('address').value = data.address;
        document.getElementById('contact').value = data.phone;
    
   };

   fetchContact();


    //return the contact details page with the following properties name, email, address, contact
    return (
        <div className="container mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">Contact Details</h3>
            <a href="/" className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded">Back</a>
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none  border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                Address
                            </label>
                            <input
                                className="shadow appearance-none  border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="address"
                                type="text"
                                placeholder="Address"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                                Contact
                            </label>
                            <input
                                className="shadow appearance-none  border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="contact"
                                type="text"
                                placeholder="Contact"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
};

//export default details
export default Details;