package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class IntegrationPostOfficeDto implements Serializable {

	private static final long serialVersionUID = -8966201177266952630L;
	private Long id;
	private TravelScheduleDto travelSchedule;
	private StatusIntegrationDto statusIntegration;
	private Date dateSend;

	public IntegrationPostOfficeDto() {
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
		IntegrationPostOfficeDto other = (IntegrationPostOfficeDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}