package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class TravelScheduleDto implements Serializable {

	private static final long serialVersionUID = 334016099640974267L;
	
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private TechnicalSheetDto technicalSheet;
	private TargetDto target;
	private Date dateScheduling;
	private Boolean sendSms = false;	
	private Boolean sendEmail = false;	
	private Date dateCreate;
	private Date dateDelete;
	private Boolean riskManagement = false;	
	private Boolean integrated = false;	
	private Boolean anticipateTravel = false;	
	private Date dateAnticipateStart;
	private Date dateAnticipateEnd;
	private String anticipateObs;
	private Boolean deletedAutomatic  = false;
	private Integer idTravelExternal;
	private Boolean initSendPosition = false;	
	private Boolean endSendPosition = false;	
	private Date dateStartSendPosition;
	private Date dateEndTravel;
	private Date dateUpdateTravel;
	private LoginDto loginUpdate;
	private LoginDto loginDelete;
	private Boolean resendTripTms = false;	
	public TravelScheduleDto() {
		
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
		TravelScheduleDto other = (TravelScheduleDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}