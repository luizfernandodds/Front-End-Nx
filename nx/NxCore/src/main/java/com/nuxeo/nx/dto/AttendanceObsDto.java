package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AttendanceObsDto implements Serializable {

	private static final long serialVersionUID = -4390448403871993283L;
	
	private Long id;
	private AttendanceDto attendance;
	private String observation;
	private LocalDateTime dateCreate;

	public AttendanceObsDto() {
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
		AttendanceObsDto other = (AttendanceObsDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}