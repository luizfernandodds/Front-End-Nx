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
public class VehicleBrandDto implements Serializable {

	private static final long serialVersionUID = 705775685609900494L;
	
	private Integer id;
	private String name;
	private Set<VehicleModelDto> models;

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
		VehicleBrandDto other = (VehicleBrandDto) obj;
		return Objects.equals(id, other.id);
	}

	
}