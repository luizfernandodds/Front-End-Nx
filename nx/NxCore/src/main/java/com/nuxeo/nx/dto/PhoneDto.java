package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class PhoneDto implements Serializable {

	private static final long serialVersionUID = -3858912589297434496L;
	private Long id;
	private String name;
	private String cell;
	private String home;
	private String work;
	private String fax;
	private TargetDto target;

	public PhoneDto() {
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
		PhoneDto other = (PhoneDto) obj;
		return Objects.equals(id, other.id);
	}

	
}