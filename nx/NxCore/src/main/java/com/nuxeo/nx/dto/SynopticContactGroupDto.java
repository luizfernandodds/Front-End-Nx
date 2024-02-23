package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class SynopticContactGroupDto implements Serializable  {
	
	private static final long serialVersionUID = -4796762773757579379L;
	private Long id;
	private SynopticDto synoptic;
	private ContactGroupDto contactGroup;
	private LoginDto loginCreate;
	private LoginDto loginDelete;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	
	
	public SynopticContactGroupDto() {
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SynopticContactGroupDto other = (SynopticContactGroupDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}
