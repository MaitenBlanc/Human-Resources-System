package gm.rrhh.controller;

import gm.rrhh.Service.EmployeeService;
import gm.rrhh.Service.IEmployeeService;
import gm.rrhh.exception.ResourceNotFoundException;
import gm.rrhh.model.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
// http://localhost:8080/rrhh-app/
@RequestMapping("rrhh-app")
@CrossOrigin(value = "http://localhost:3000")
public class EmployeeController {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
        private IEmployeeService employeeService;

    // http://localhost:8080/rrhh-app/employees
    @GetMapping("/employees")
    public List<Employee> getEmployees(){
        var employees = employeeService.listEmployees();
        employees.forEach((employee -> logger.info(employee.toString())));
        return employees;
    }

    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee) {
        logger.info("Employee to add: " + employee);
        return employeeService.saveEmployee(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer id) {
        Employee employee = employeeService.searchEmployeeById(id);
        if(employee == null) {
            throw new ResourceNotFoundException("Id not found: " + id);
        }
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody Employee employeeReceived) {
        Employee employee = employeeService.searchEmployeeById(id);
        if (employee == null) {
            throw new ResourceNotFoundException("Id received doesn't exist: " + id);
        }
        employee.setName(employeeReceived.getName());
        employee.setDepartment(employeeReceived.getDepartment());
        employee.setSalary(employeeReceived.getSalary());
        employeeService.saveEmployee(employee);
        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Integer id) {
        Employee employee = employeeService.searchEmployeeById(id);
        if (employee == null) {
            throw new ResourceNotFoundException("Id received doesn't exist: " + id);
        }
        employeeService.deleteEmployee(employee);
        // Json {"eliminado": "true"}
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
