package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class LogAccidentDto implements Serializable {

	private static final long serialVersionUID = 2936815166300999070L;
	private Long id;
	private TargetDto target;
	private String observation;
	private Date dateCreate;
	private Boolean accident = false;	
	
	public LogAccidentDto() {
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
		LogAccidentDto other = (LogAccidentDto) obj;
		return Objects.equals(id, other.id);
	}

}