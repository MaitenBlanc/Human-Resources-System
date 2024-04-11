import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEmployee() {

    const urlBase = "http://localhost:8080/rrhh-app/employees";

    let navigate = useNavigate();

    const { id } = useParams();

    const [employee, setEmployee] = useState({
        name: '',
        department: '',
        salary: ''
    });

    const { name, department, salary } = employee;

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        const result = await Axios.get(`${urlBase}/${id}`);
        setEmployee(result.data);
    }

    const onInputChange = (e) => {
        // spread operator ... (expandir los atributos)
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await Axios.put(`${urlBase}/${id}`, employee);
        // Redirigir al home
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='container text-center ' style={{ margin: '30px' }}>
                <h3>Edit Employee</h3>
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
                    <button type="submit" className="btn btn-warning btn-sm me-3">Save</button>
                    <a href='/' className="btn btn-danger btn-sm">Back</a>
                </div>
            </form>
        </div>
    )
}
