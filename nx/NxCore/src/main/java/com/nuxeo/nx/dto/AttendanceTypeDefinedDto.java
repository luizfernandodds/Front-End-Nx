package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

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
public class AttendanceTypeDefinedDto implements Serializable {

	private static final long serialVersionUID = 5422949710722978128L;
	private Long id;
	private LoginDto login;
	private String description;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	private Integer idJustification;

	public AttendanceTypeDefinedDto() {
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AttendanceTypeDefinedDto other = (AttendanceTypeDefinedDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}