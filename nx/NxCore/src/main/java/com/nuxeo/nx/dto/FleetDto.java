package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class FleetDto implements Serializable {
	
	private static final long serialVersionUID = -2204905614765735L;
	private Long id;
	private CustomerDto customer;
	private String description;
	private String name;
	private Set<TargetDto> listTarget;

	public FleetDto() {
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
		FleetDto other = (FleetDto) obj;
		return Objects.equals(id, other.id);
	}

}