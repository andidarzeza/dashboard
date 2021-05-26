package com.dashboard.project.model;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;

@Component
public class Employee {

	private int totalHours;
	private String firstName;
	private String lastName;
	private Salary salary;
	private boolean working;

	public int getTotalHours() {
		return totalHours;
	}

	public void setTotalHours(int totalHours) {
		this.totalHours = totalHours;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Salary getSalary() {
		return salary;
	}

	public void setSalary(Salary salary) {
		this.salary = salary;
	}

	public boolean isWorking() {
		return working;
	}

	public void setWorking(boolean working) {
		this.working = working;
	}

	@Override
	public String toString() {
		return "Employee{" +
				"totalHours=" + totalHours +
				", firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", salary=" + salary +
				", working=" + working +
				'}';
	}
}
