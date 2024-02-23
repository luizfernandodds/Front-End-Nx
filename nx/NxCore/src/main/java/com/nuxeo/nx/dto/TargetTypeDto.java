package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TargetTypeDto implements Serializable {
	private static final long serialVersionUID = 1L;
	public static final String FIND_VALID_IDS = "TargetType.findAllByIds";

	private Long id;
	private String name;
	private List<TargetDto> listTarget;

	public TargetTypeDto() {
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
		TargetTypeDto other = (TargetTypeDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}