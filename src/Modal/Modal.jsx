import './Modal.css'
import { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Modal = () =>
{
    const [ formaData, setFormData ] = useState({username: '', email: '', phone: '', dob: ''});
    const [ showForm, setShowForm ] = useState(false);

    const handleChange = (e) =>
    {
        const {name,value} = e.target;
        setFormData({...formaData,[name]:value})
    }

    const handleDateChange = (date) =>
    {
        setFormData((prev)=>({...prev,dob:date}))
    }

    const handleUsernameValidation = (e) =>
    {
        const input = e.target;
        if(!input.validity.valid)
        {
            return input.setCustomValidity('Please fill out this field');
        } 
        else
        {
            return input.setCustomValidity('');   
        }
    }

    const handleEmailValidation = (e) =>
    {
        const input = e.target;
        if(!input.value)
        {
            return input.setCustomValidity('Please fill out this field');
        } 
        else if(!input.value.includes('@'))
        {
            return input.setCustomValidity(`Please include an '@' in the email address. '${formaData.email} is missing an '@'`);
        }
        else
        {
            return input.setCustomValidity('');   
        }
    }

    const closeContainer = (event) => 
    {
        if (!event.target.closest('#form'))
            setShowForm(false);
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if(formaData.phone.length<10)
            return alert('Invalid phone number. Please enter a 10-digit phone number.')
        
        const today = new Date();
        const enteredDate = new Date(formaData.dob);
        if(enteredDate > today)
            return alert('Invalid date of birth. Date of birth cannot be in the future.')
        
        setFormData({username: '', email: '', phone: '', dob: ''})
    }

    return(
        <div className='container'>
            <h1>User Details Modal</h1>
            <button onClick={()=>setShowForm(true)}>Open Form</button>

            {showForm && <div className='modal' onClick={closeContainer}>
            <div className='modal-content'>
                <form onSubmit={handleSubmit} id='form'>
                    <h2>Fill Details</h2>

                    <div className='form-row'>
                        <label>Username:</label>
                        <input 
                            id="username" 
                            name="username" 
                            type="text" 
                            value={formaData.username} 
                            onChange={handleChange} 
                            onInput={handleUsernameValidation}
                            required
                        />
                    </div>

                    <div className='form-row'>
                        <label>Email Address:</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="text" 
                            value={formaData.email} 
                            onChange={handleChange} 
                            onInput={handleEmailValidation}
                            required
                        />
                    </div>

                    <div className='form-row'>
                        <label>Phone Number:</label>
                        <input 
                            id="phone" 
                            name="phone" 
                            type="text" 
                            value={formaData.phone} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className='form-row'>
                        <label>Date of Birth:</label>
                        <DatePicker 
                            id="dob" 
                            name="dob" 
                            selected={formaData.dob} 
                            placeholderText="dd-mm-yyyy" 
                            onChange={handleDateChange} 
                        />
                    </div> 

                    <button className='submit-button'>Submit</button>
                </form>
                </div>
            </div>}
        </div>
    )
}

export default Modal