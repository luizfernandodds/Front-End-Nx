package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TechnicalSheetDto implements Serializable {
	
	private static final long serialVersionUID = -4355966913080638363L;

	private Long id;

	private CustomerDto customer;
	private PostOfficeLineDto postOfficeLine;
	private String numberLineTec;
	private TechnicalSheetFrequencyDto technicalSheetFrequency;
	private ManagerUnitDto managerUnit;
	private String originDestiny;
	private String direction;
	private Boolean active = true;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	private String idDatasheet;
	private LoginDto login;

	public TechnicalSheetDto() {
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
		TechnicalSheetDto other = (TechnicalSheetDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}