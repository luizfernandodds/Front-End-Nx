package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class CommandDto implements Serializable {

	private static final long serialVersionUID = -4379109482155169569L;
	
	private Long id;
	private String name;

	public CommandDto() {
	}

	public CommandDto(Long id) {
		this.setId(id);
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
		CommandDto other = (CommandDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}