package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TypeTrackerDto implements Serializable {
	
	private static final long serialVersionUID = 3406729747278030412L;
	
	private Long id;
	private String description;
	private Date dateCreate;
	private LocalDateTime dateDelete;
	
	
	public TypeTrackerDto() {
		
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
		TypeTrackerDto other = (TypeTrackerDto) obj;
		return Objects.equals(id, other.id);
	}
}
