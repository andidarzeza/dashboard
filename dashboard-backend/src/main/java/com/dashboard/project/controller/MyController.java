package com.dashboard.project.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import com.dashboard.project.repository.*;
import com.dashboard.project.model.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MyController {

	@Autowired
	MyRepository repo;

	@Autowired
	DashRepository dashRepo;

	@Autowired
	SimpMessagingTemplate template;

	@PostMapping("/dashboard")
	public Dashboard addChartOption(@RequestBody Dashboard dashboard){
		dashRepo.save(dashboard);
		//push on socket
		this.template.convertAndSend("/chat",dashboard);
		return dashboard;
	}

	@DeleteMapping("/dashboard/{id}")
	public Dashboard deleteDashboard(@PathVariable String id) {
		Dashboard dashboard = dashRepo.findById(id).get();
		dashRepo.delete(dashboard);
		List<Dashboard> allDashboards = dashRepo.findAll();
		this.template.convertAndSend("/delete", allDashboards);
		return dashboard;
	}

	@GetMapping("/getDashboards")
	public List<Dashboard> getAllDashboards() {
		return dashRepo.findAll();
	}

	@PutMapping("/dashboards/{id}")
	public Dashboard updateDashboard(@RequestBody Dashboard dashboard, @PathVariable String id){
		dashboard.setDashboardID(id);
		dashRepo.save(dashboard);

		this.template.convertAndSend("/update",dashboard);
		List<Dashboard> allDashboards = dashRepo.findAll();
		this.template.convertAndSend("/getAll", allDashboards);
		return dashboard;
	}

	@GetMapping("/dashboard/{id}")
	public Dashboard getDashboardByID(@PathVariable String id) {
		Dashboard dashboard = this.dashRepo.findById(id).get();
		return dashboard;
	}


}
