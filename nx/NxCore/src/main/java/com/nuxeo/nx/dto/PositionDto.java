package com.nuxeo.nx.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class PositionDto {

	private String identify;
	private String dateTransmission;
	private String dateReceipt;
	private String address;
	private String speed;
	private String satellite;
	private String memory;
	private String ignition;
	private String block;
	private String coordinates;
	private String odometer;
	private String business;

}
