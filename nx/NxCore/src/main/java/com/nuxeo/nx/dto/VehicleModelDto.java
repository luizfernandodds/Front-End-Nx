package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class VehicleModelDto implements Serializable {

	private static final long serialVersionUID = -7624453206547830922L;
	
	private Long id;
	private String name;
	private VehicleBrandDto brand;

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
		VehicleModelDto other = (VehicleModelDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}