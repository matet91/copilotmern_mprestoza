//import react useeffect, usestate
import React, { useEffect, useState } from 'react';
//impoort link
import { Link } from 'react-router-dom';

//create a function to submit the form
const onSubmit = (e) => {
    e.preventDefault();

    //create a loader indicater
    document.querySelector('.status-message').innerHTML = 'Please wait...';

    //declare form id
    const form = document.querySelector('form');

    //serialize the form data
    const formData = new FormData(form);

    //create an object to hold the form data
    const newContact = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
    };

    //validate form
    if (newContact.name === '' || newContact.email === '' || newContact.phone === '' || newContact.address === '') {
         //remove success class
         document.querySelector('.status-message').classList.remove('text-green-500');

        //add error message in status div
        document.querySelector('.status-message').innerHTML = 'Please fill in all fields';

        //add error class from tailwindcss
        document.querySelector('.status-message').classList.add('text-red-500');

        //highlight border in red if empty else remove class, using loop
        for (let i = 0; i < e.target.length - 1; i++) {
            if (e.target[i].value === '') {
                e.target[i].classList.add('border-red-500');
            } else {
                e.target[i].classList.remove('border-red-500');
            }
        }
        return;
    } else {
        //remove error class in field border and status div
        for (let i = 0; i < e.target.length - 1; i++) {
            e.target[i].classList.remove('border-red-500');
        }
        document.querySelector('.status-message').classList.remove('text-red-500');
    }

    let url = 'http://localhost:3500/cms';
    let method  = 'POST';
    let msg = 'Contact added successfully';

    //get the id from hidden input
    const id = document.querySelector('input[name="id"]').value;

    //check if not empty or element exist
    if (document.querySelector('input[name="id"]') && id !== '') {
        //init url variable then assign the url
        url = `http://localhost:3500/cms/${id}`;
        method = 'PATCH';
        msg = 'Contact updated successfully';
    } 

    //create a fetch request to add a new contact
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
    })
        .then(response => {
            if (response.ok) {

                //remove error class
                document.querySelector('.status-message').classList.remove('text-red-500');

                //add success message in status div
                document.querySelector('.status-message').innerHTML = msg;
                //clear the form
                e.target.reset();
                
                //add success class from tailwindcss
                document.querySelector('.status-message').classList.add('text-green-500');

                //set timeout reload the page
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

            } else {
                //remove success class
                document.querySelector('.status-message').classList.remove('text-green-500');

                //add error message in status div
                document.querySelector('.status-message').innerHTML = 'Error adding contact';
                //add error class from tailwindcss
                document.querySelector('.status-message').classList.add('text-red-500');
            }

            //clear status in div
            setTimeout(() => {
                document.querySelector('.status-message').innerHTML = '';
            }, 3000);

        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
};

//create a function that return table row for contact listing
const ContactRow = (props) => {
    return (
        <tr>
            <td><Link to={`/details/${props.contact._id}`}>{props.contact.name}</Link></td> 
            <td>{props.contact.email}</td>
            <td>{props.contact.phone}</td>
            <td>{props.contact.address}</td>
            <td>
            <span className="text-blue-500 cursor-pointer" onClick={()=>props.editContact(props.contact._id)}>Edit</span> | <span className="text-red-500 cursor-pointer" onClick={()=>props.deleteContact(props.contact._id)}>Delete</span>

            </td>
        </tr>
    )
};

//create a function using usestate to fetch all contacts
export default function GetContacts() {
    const [contacts, setContacts] = useState([]);

     //create an async fetch request
    const fetchContacts = async () => {
        const response = await fetch('http://localhost:3500/cms');

        //check if response not ok
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        setContacts(data);
    };

    // useeffect
    useEffect(() => {
        fetchContacts();
        return;
    }, []);

    //create a function that will edit a contact
        async function editContact(id){
            //focus on the form
            document.querySelector('form').scrollIntoView();
            //change button name to update
            document.querySelector('button[type="submit"]').innerHTML = 'Update Contact';

            //replace button background color to orange with tailwindcss
            document.querySelector('button[type="submit"]').classList.replace('bg-blue-500', 'bg-orange-500');

            //add condition if id is not empty or null
            if (id !== '' || id !== null) {
                //create a fetch request to get the contact
            const fetchContact = await fetch(`http://localhost:3500/cms/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            
            if (fetchContact.ok) {
                        const data = await fetchContact.json();
                        console.log(data);
                        //populate the form with contact info
                        document.querySelector('#name').value = data.name;
                        document.querySelector('#email').value = data.email;
                        document.querySelector('#phone').value = data.phone;
                        document.querySelector('#address').value = data.address;

                        //assign id to field id
                        document.querySelector('#id').value = data._id;

            } else {
                //add error message
                document.querySelector('.status-message').innerHTML = 'Error getting contact';
                //add error class from tailwindcss
                document.querySelector('.status-message').classList.add('text-red-500');
            }
            }
        };

    //create a function that will delete a contact
    async function deleteContact(id) {
        //create a condition if id is not empty or null
        if (id !== '' || id !== null) {
            //create confirmation dialog in reactjs
            const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
            if(!confirmDelete) {
                return;
            }
            
            //create a fetch request to delete the contact
            await fetch(`http://localhost:3500/cms/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        //add success message
                        document.querySelector('.status-message').innerHTML = 'Contact deleted successfully';
                        //add success class from tailwindcss
                        document.querySelector('.status-message').classList.add('text-green-500');
                        //reload the page
                        window.location.reload();
                    } else {
                        //add error message
                        document.querySelector('.status-message').innerHTML = 'Error deleting contact';
                        //add error class from tailwindcss
                        document.querySelector('.status-message').classList.add('text-red-500');
                    }

                    //clear status in div
                    setTimeout(() => {
                        document.querySelector('.status-message').innerHTML = '';
                    }, 3000);
                })
                .catch(error => console.log(error));
            }
    };

    //create an async function to search contact, return the result and set the state
    async function searchContact() {
        //get the search keyword
        const keyword = document.querySelector('#search').value;

        //create condition if keyword is empty
        if (keyword === '') {
            fetchContacts();
            return;
        } 
        //create a fetch request to search the contact
        const response = await fetch(`http://localhost:3500/cms/search/${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //check if response not ok
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        setContacts(data);
        return;
    };

    //create a method that will map the contact row
    const contactList = () => {
        return contacts.map(contact => {
            return (
                <ContactRow
                    contact={contact}
                    deleteContact={()=>deleteContact(contact._id)}
                    editContact={()=>editContact(contact._id)}
                    key={contact._id}
                />
            )
        });
    };

    //create 

    return (
        <div className="mt-6 mb-6">
            <h2 className="text-xl font-bold">Add New Contact</h2>
            <hr className="my-4" />
            <div className="text-center status-message font-bold"></div>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="border border-gray-400 p-2 rounded-md" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="border border-gray-400 p-2 rounded-md" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" id="phone" className="border border-gray-400 p-2 rounded-md" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" className="border border-gray-400 p-2 rounded-md" />
                </div>
                <input type="hidden" name="id" id="id" />
                <div className="flex flex-col mt-6">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Add Contact</button>
                </div>
            </form>
            <hr className="my-4" />
            <h2 className="text-2xl font-bold text-center">Search</h2>
            <div className="flex flex-col mt-6">
                <label htmlFor="search">Search</label>
                <input type="text" name="search" id="search" className="border border-gray-400 p-2 rounded-md" />
            </div>
            <div className="flex flex-col mt-6">
                <button onClick={()=>searchContact()} className="bg-blue-500 text-white p-2 rounded-md">Search</button>
            </div>
            <hr className="my-4" />
            <h2 className="text-2xl font-bold text-center">Contact List</h2>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                </thead>
                <tbody>
                    {contactList()}
                </tbody>
            </table>
        </div>
    );
};