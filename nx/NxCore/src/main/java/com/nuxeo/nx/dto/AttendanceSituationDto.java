package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AttendanceSituationDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private List<SentinelDto> listSentinel;

	public AttendanceSituationDto() {
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
		AttendanceSituationDto other = (AttendanceSituationDto) obj;
		return Objects.equals(id, other.id);
	}
}