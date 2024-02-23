package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class SynopticTypeItemDto implements Serializable {
	
	private static final long serialVersionUID = 7964245416684434291L;
	private Long id;
	private String description;
	private LocalDateTime dateDelete;
	
	
	public SynopticTypeItemDto() {
		
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
		SynopticTypeItemDto other = (SynopticTypeItemDto) obj;
		return Objects.equals(id, other.id);
	}
	

}
