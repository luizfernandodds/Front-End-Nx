package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeviceDto implements Serializable {

	private static final long serialVersionUID = 8125983381961455556L;
	
	private Long id;
	private String name;
	private Long serial;
	private ProtocolDto protocol;
	private String firmware;
	private String model;
	private PhoneLineDto phoneLine;
	private LoginDto logCad;
	private TargetDto target;
	private Integer qtdInput;
	private Integer qtdOutput;
	private String idSatelital;
	private String commandType;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	private CommandTypeIntegrationDto commandTypeIntegration;
	
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DeviceDto other = (DeviceDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}