import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListEmployees() {

    const urlBase = "http://localhost:8080/rrhh-app/employees";

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const result = await Axios.get(urlBase);
        console.log("Result loading employees");
        console.log(result.data);
        setEmployees(result.data);
    }

    const deleteEmployee = async (id) => {
        await Axios.delete(`${urlBase}/${id}`);
        loadEmployees();
    }

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3>Human Resources System</h3>
            </div>

            <table className="table table-striped table-hover align-middle ">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Salary</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Iteración del arreglo de empleados
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <th scope="row">{employee.idEmployee}</th>
                                <td>{employee.name}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <NumericFormat value={employee.salary} displayType={'text'}
                                        thousandSeparator=',' prefix={'$'} decimalScale={2} fixedDecimalScale />
                                </td>
                                <td className="text-center">
                                    <div>
                                        <Link to={`/edit/${employee.idEmployee}`}
                                            className='btn btn-warning btn-sm me-3'>Edit</Link>
                                        <button onClick={() => deleteEmployee(employee.idEmployee)}
                                            className="btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}
