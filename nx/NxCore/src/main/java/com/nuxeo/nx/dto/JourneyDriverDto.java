package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class JourneyDriverDto implements Serializable {

	private static final long serialVersionUID = -8481741439587881547L;
	private Long id;
	private CustomerDto customer;
	private DriverDto driver;
	private String name;	
	private String targets;	
	private LocalDateTime dateCreate;
	private Long idLoginCreate;	
	private LocalDateTime dateUpdate;
	private Long idLoginUpdate;	
	private LocalDateTime dateDelete;
	private Long idLoginDelete;	
    private List<JourneyDriverParameterDto> listJourneyDriverParameter;

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
		JourneyDriverDto other = (JourneyDriverDto) obj;
		return Objects.equals(id, other.id);
	}

	
}