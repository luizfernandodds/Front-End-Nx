package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TravelScheduleSemiTrailerDto implements Serializable {

	private static final long serialVersionUID = 7874327845957952355L;
	
	private Long id;
	private TravelScheduleDto travelSchedule;
	private SemiTrailerDto semiTrailer;
	private Integer sequence;
	
	public TravelScheduleSemiTrailerDto() {
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
		TravelScheduleSemiTrailerDto other = (TravelScheduleSemiTrailerDto) obj;
		return Objects.equals(id, other.id);
	}


}