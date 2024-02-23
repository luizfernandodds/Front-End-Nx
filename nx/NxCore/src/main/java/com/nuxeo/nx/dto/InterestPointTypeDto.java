package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class InterestPointTypeDto implements Serializable {

	private static final long serialVersionUID = 8573873453254331607L;
	
	private Integer id;
	private String name;
	private String description;
	private String iconUrl;

	public InterestPointTypeDto() {
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
		InterestPointTypeDto other = (InterestPointTypeDto) obj;
		return Objects.equals(id, other.id);
	}

}