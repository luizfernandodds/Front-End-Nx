package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TechnicalSheetFrequencyDto implements Serializable {

	private static final long serialVersionUID = 4387334766557616564L;
	private Long id;
	private Boolean sunday = false;	
	private Boolean monday = false;	
	private Boolean tuesday = false;	
	private Boolean wednesday = false;	
	private Boolean thursday = false;	
	private Boolean friday = false;	
	private Boolean saturday = false;	

	public TechnicalSheetFrequencyDto() {
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
		TechnicalSheetFrequencyDto other = (TechnicalSheetFrequencyDto) obj;
		return Objects.equals(id, other.id);
	}


}