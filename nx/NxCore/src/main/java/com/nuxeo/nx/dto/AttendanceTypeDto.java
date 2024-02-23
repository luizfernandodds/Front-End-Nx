package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AttendanceTypeDto implements Serializable {
	private static final long serialVersionUID = 1L;
	public static final String FIND_ALL_ORDER_NAME = "AttendanceType.findAll";

	private Long id;
	private String name;

	public AttendanceTypeDto() {
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
		AttendanceTypeDto other = (AttendanceTypeDto) obj;
		return Objects.equals(id, other.id);
	}
}