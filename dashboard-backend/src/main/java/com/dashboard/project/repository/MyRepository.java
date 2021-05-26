package com.dashboard.project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dashboard.project.model.Employee;


@Repository
public interface MyRepository extends MongoRepository<Employee, String>{

}

