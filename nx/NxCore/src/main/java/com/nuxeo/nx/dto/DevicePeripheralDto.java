package com.nuxeo.nx.dto;

import java.io.Serializable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@EqualsAndHashCode
@ToString
@Getter
@Setter
public class DevicePeripheralDto implements Serializable {

	private static final long serialVersionUID = -4966336490583878808L;
	private Long id;
	private DeviceDto device;
	private PeripheralDto peripheral;
	private Integer input;
	private Integer output;
	
	public DevicePeripheralDto() {
	}


}