package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ContactGroupDto implements Serializable {

	private static final long serialVersionUID = 3441284669150582750L;
	private Long id;
	private LoginDto loginCreate;
	private LoginDto loginUpdate;
	private LoginDto loginDelete;
	private String name;
	private Boolean sendEmail = false;
	private Boolean sendSms = false;
	private LocalDateTime dateCreate;
	private LocalDateTime dateUpdate;
	private LocalDateTime dateDelete;
	private Boolean statusSmEmail = true;
	private Boolean statusSmSms = true;
	private Boolean routeDeviationEmail = true;
	private Boolean routeDeviationSms = true;
	private Boolean startTravelEmail = true;
	private Boolean startTravelSms = true;
	private Boolean endTravelEmail = true;
	private Boolean endTravelSms = true;
	private Boolean signalLossEmail = true;
	private Boolean signalLossSms = true;
	private String emailTransient;
	private String celularTransient;

	public ContactGroupDto() {
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
		ContactGroupDto other = (ContactGroupDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
