package com.nuxeo.nx.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.Objects;

@ToString
@Getter
@Setter
public class ServiceScheduleDto implements Serializable {

	private static final long serialVersionUID = -5940923315791426875L;
	
	private Integer id;
	private Boolean noPositionActive;
	private Date alterService;

	@Override
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
		ServiceScheduleDto other = (ServiceScheduleDto) obj;
		return Objects.equals(id, other.id);
	}


}