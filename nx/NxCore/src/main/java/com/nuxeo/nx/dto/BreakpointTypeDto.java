package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


/**
 * The persistent class for the attendance_type database table.
 * 
 */
@ToString
@Getter
@Setter
public class BreakpointTypeDto implements Serializable {

	private static final long serialVersionUID = 4190715748348932602L;
	
	private Long id;
	private String description;

	public BreakpointTypeDto() {
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
		BreakpointTypeDto other = (BreakpointTypeDto) obj;
		return Objects.equals(id, other.id);
	}


}