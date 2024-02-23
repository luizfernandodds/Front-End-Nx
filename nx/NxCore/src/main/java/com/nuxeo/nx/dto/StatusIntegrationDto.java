package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class StatusIntegrationDto implements Serializable {
	private static final long serialVersionUID = 1L;

	public static final String FIND_VALID_IDS = "StatusIntegration.findAllOrderByDescription";

	private Long id;
	private String description;

	public StatusIntegrationDto() {
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
		StatusIntegrationDto other = (StatusIntegrationDto) obj;
		return Objects.equals(id, other.id);
	}


}