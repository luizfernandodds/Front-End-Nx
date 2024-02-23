package com.nuxeo.nx.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class NoPositionDto implements Serializable {

	private static final long serialVersionUID = -3109906370044452371L;

	private String identify;
	private String dateTransmission;;
	private String dateReceipt;
	private String address;
	private String city;
	private String dias;
	private String serial;
	private String lat;
	private String longi;
	private String protocol;
	private String period;
	private TargetDto target;
	private boolean ignition;
	private boolean block;
	private boolean panic;
	private Integer speed;

	public boolean getIgnition() {
		return ignition;
	}
	
	public boolean getPanic() {
		return panic;
	}
	
}
