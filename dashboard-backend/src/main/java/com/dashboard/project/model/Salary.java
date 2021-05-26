package com.dashboard.project.model;

import java.math.BigDecimal;

public class Salary {

	private double lastMonth;
	private double thisMonth;
	public double getLastMonth() {
		return lastMonth;
	}
	public void setLastMonth(double lastMonth) {
		this.lastMonth = lastMonth;
	}
	public double getThisMonth() {
		return thisMonth;
	}
	public void setThisMonth(double thisMonth) {
		this.thisMonth = thisMonth;
	}

	@Override
	public String toString() {
		return "Salary [lastMonth=" + lastMonth + ", thisMonth=" + thisMonth + "]";
	}

	
}
