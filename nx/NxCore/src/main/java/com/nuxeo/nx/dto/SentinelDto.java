package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the sentinel database table.
 *
 */
@ToString
@Getter
@Setter
public class SentinelDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String identifier;
	private Date create;
	private double latitude;
	private double longitude;
	private AttendanceSituationDto attendanceSituation;
	private DriverDto driver;
	private EventFiredDto eventFired;
	private LoginDto login;
	private TargetDto target;
	private String treatedBy;
	private String eventName;
	private String coordinates;
	private Date dateServer;
	private String eventDescription;
	private Long idTrip;
	List<SentinelDto> listSentinelGrouping;
	private Long idMonitoringRequest;
	private Long idControlEvent;
	
	public SentinelDto() {
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
		SentinelDto other = (SentinelDto) obj;
		return Objects.equals(id, other.id);
	}
}