package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProviderDto implements Serializable {

	private static final long serialVersionUID = 6833728461556295852L;

	private Long id;
	private String name;
	
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
		ProviderDto other = (ProviderDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}