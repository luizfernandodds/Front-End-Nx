package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

@ToString
@Getter
@Setter
public class ManagerUnitDto implements Serializable {

	private static final long serialVersionUID = -4166613454182541L;
	private Long id;
	private CustomerDto customer;
	private String name;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	private CityDto city;

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
		ManagerUnitDto other = (ManagerUnitDto) obj;
		return Objects.equals(id, other.id);
	}
}