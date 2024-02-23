package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class IntegrationDto implements Serializable {

	private static final long serialVersionUID = -7916237665938538193L;
	private Long id;
	private String ip;
	private int services;
	private int methods;
	private LoginDto login;

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
		IntegrationDto other = (IntegrationDto) obj;
		return Objects.equals(id, other.id);
	}

	
}