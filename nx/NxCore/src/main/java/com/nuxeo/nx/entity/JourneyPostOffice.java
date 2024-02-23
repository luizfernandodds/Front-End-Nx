package com.nuxeo.nx.entity;

import java.util.List;

public class JourneyPostOffice {
	private Long id;
	private String date;
	private String idFicha;
	private String integrador;
	private String geoJson;
	private Workflow workflow;
	private List<Breakpoint> breakpoints;
	private Vehicle plannedVehicle;
	private List<Driver> plannedDrivers;
	private List<Preposto> preposto;
	private List<RiskArea> riskAreas;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getIdFicha() {
		return idFicha;
	}

	public void setIdFicha(String idFicha) {
		this.idFicha = idFicha;
	}

	public String getGeoJson() {
		return geoJson;
	}

	public void setGeoJson(String geoJson) {
		this.geoJson = geoJson;
	}

	public String getIntegrator() {
		return integrador;
	}

	public void setIntegrador(String integrador) {
		this.integrador = integrador;
	}

	public Workflow getWorkflow() {
		return workflow;
	}

	public void setWorkflow(Workflow workflow) {
		this.workflow = workflow;
	}

	public List<Breakpoint> getBreakpoints() {
		return breakpoints;
	}

	public void setBreakpoints(List<Breakpoint> breakpoints) {
		this.breakpoints = breakpoints;
	}

	public Vehicle getPlannedVehicle() {
		return plannedVehicle;
	}

	public void setPlannedVehicle(Vehicle plannedVehicle) {
		this.plannedVehicle = plannedVehicle;
	}

	public List<Driver> getPlannedDrivers() {
		return plannedDrivers;
	}

	public void setPlannedDrivers(List<Driver> plannedDrivers) {
		this.plannedDrivers = plannedDrivers;
	}

	public List<Preposto> getPreposto() {
		return preposto;
	}

	public void setPreposto(List<Preposto> preposto) {
		this.preposto = preposto;
	}

	public List<RiskArea> getRiskAreas() {
		return riskAreas;
	}

	public void setRiskAreas(List<RiskArea> riskAreas) {
		this.riskAreas = riskAreas;
	}

}