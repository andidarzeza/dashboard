package com.dashboard.project.repository;

import com.dashboard.project.model.ChartOptions;
import com.dashboard.project.model.Dashboard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dashboard.project.model.Employee;


@Repository
public interface DashRepository extends MongoRepository<Dashboard, String>{

}

