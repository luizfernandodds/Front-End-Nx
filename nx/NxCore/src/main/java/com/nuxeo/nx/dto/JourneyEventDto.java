package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@ToString
@Getter
@Setter
public class JourneyEventDto implements Serializable {

	private static final long serialVersionUID = 7404813345612627383L;
	private Long id;
	private Long journeyId;
	private EventDto event;
	
	public JourneyEventDto() {
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
		JourneyEventDto other = (JourneyEventDto) obj;
		return Objects.equals(id, other.id);
	}

	
}