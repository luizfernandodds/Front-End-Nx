package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AttendanceStatusDto implements Serializable {

	private static final long serialVersionUID = 4322219470521900274L;
	
	private Long id;
	private String name;

	public AttendanceStatusDto() {
	}

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
		AttendanceStatusDto other = (AttendanceStatusDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}