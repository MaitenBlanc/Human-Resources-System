package gm.rrhh.Service;

import gm.rrhh.model.Employee;

import java.util.List;

public interface IEmployeeService {
    public List<Employee> listEmployees();

    public Employee searchEmployeeById(Integer idEmployee);

    public Employee saveEmployee(Employee employee);

    public void deleteEmployee(Employee employee);
}
