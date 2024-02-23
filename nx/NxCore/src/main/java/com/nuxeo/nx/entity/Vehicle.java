package com.nuxeo.nx.entity;

public class Vehicle {
	private String licensePlate;
	private String additionalLicensePlate;
	private String model;
	private Integer weight;

	public String getLicensePlate() {
		return licensePlate;
	}

	public void setLicensePlate(String licensePlate) {
		this.licensePlate = licensePlate;
	}

	public String getAdditionalLicensePlate() {
		return additionalLicensePlate;
	}

	public void setAdditionalLicensePlate(String additionalLicensePlate) {
		this.additionalLicensePlate = additionalLicensePlate;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getWeight() {
		return weight;
	}

	public void setWeight(Integer weight) {
		this.weight = weight;
	}

}