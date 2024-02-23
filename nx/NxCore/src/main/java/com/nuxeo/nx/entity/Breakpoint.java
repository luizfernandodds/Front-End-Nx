package com.nuxeo.nx.entity;

public class Breakpoint {
	private String description;
	private String expectedArriveTime;
	private String expectedDepartTime;
	private Double expectedKm;
	private BreakpointType type;
	private Geometry geometry;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getExpectedArriveTime() {
		return expectedArriveTime;
	}

	public void setExpectedArriveTime(String expectedArriveTime) {
		this.expectedArriveTime = expectedArriveTime;
	}

	public String getExpectedDepartTime() {
		return expectedDepartTime;
	}

	public void setExpectedDepartTime(String expectedDepartTime) {
		this.expectedDepartTime = expectedDepartTime;
	}

	public Double getExpectedKm() {
		return expectedKm;
	}

	public void setExpectedKm(Double expectedKm) {
		this.expectedKm = expectedKm;
	}

	public BreakpointType getType() {
		return type;
	}

	public void setType(BreakpointType type) {
		this.type = type;
	}

	public Geometry getGeometry() {
		return geometry;
	}

	public void setGeometry(Geometry geometry) {
		this.geometry = geometry;
	}
}