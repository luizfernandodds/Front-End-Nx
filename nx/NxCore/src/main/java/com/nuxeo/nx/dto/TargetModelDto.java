package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TargetModelDto implements Serializable {

	private static final long serialVersionUID = -8777683884716089511L;
	private Long id;
	private CustomerDto customer;
	private String name;
	private String mark;
	private String color;
	private Integer year;

	public TargetModelDto() {
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
		TargetModelDto other = (TargetModelDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}