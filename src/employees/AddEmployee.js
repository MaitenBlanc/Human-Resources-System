import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddEmployee() {

    let navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        department: '',
        salary: ''
    });

    const { name, department, salary } = employee;

    const onInputChange = (e) => {
        // spread operator ... (expandir los atributos)
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/rrhh-app/employees";
        await Axios.post(urlBase, employee);
        // Redirigir al home
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='container text-center ' style={{ margin: '30px' }}>
                <h3>Add Employee</h3>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required={true} value={name}
                        onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <input type="text" className="form-control" id="department" name="department" value={department}
                        onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="number" step="any" className="form-control" id="salary" name="salary"
                        value={salary} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-sm me-3">Add</button>
                    <a href='/' className="btn btn-danger btn-sm">Back</a>
                </div>
            </form>
        </div>
    )
}
