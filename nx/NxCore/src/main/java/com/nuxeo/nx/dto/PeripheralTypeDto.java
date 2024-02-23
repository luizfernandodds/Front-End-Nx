package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class PeripheralTypeDto implements Serializable {

	private static final long serialVersionUID = -8174523733893622412L;
	
	private Long id;
	private String name;
	private Integer icon;

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
		PeripheralTypeDto other = (PeripheralTypeDto) obj;
		return Objects.equals(id, other.id);
	}


}