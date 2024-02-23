package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class FuelTypeDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String i18n;
	private String name;

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
		FuelTypeDto other = (FuelTypeDto) obj;
		return Objects.equals(id, other.id);
	}

	
}